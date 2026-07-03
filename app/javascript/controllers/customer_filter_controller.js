import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "row",
    "emptyState",
    "resultsCount",
    "filterButton",
    "activeLabel"
  ]

  static values = {
    initialStatus: { type: String, default: "all" },
    singular: { type: String, default: "cliente" },
    plural: { type: String, default: "clientes" }
  }

  connect() {
    this.currentStatus = this.initialStatusValue || "all"
    this.filter()
  }

  setFilter(event) {
    event.preventDefault()

    this.currentStatus = event.currentTarget.dataset.filterValue || "all"
    this.updateUrl()
    this.filter()
  }

  filter() {
    const query = this.hasInputTarget ? this.normalize(this.inputTarget.value) : ""
    let visibleCount = 0

    this.rowTargets.forEach((row) => {
      const matchesStatus = this.matchesStatus(row)
      const searchableText = this.normalize(row.dataset.searchText || row.textContent)
      const matchesQuery = query === "" || searchableText.includes(query)
      const isVisible = matchesStatus && matchesQuery

      row.classList.toggle("hidden", !isVisible)

      if (isVisible) {
        visibleCount += 1
      }
    })

    this.updateResultsCount(visibleCount)
    this.updateEmptyState(visibleCount)
    this.updateFilterButtons()
    this.updateActiveLabel()
  }

  clearSearch() {
    if (this.hasInputTarget) {
      this.inputTarget.value = ""
      this.inputTarget.focus()
    }

    this.filter()
  }

  clearFilters() {
    this.currentStatus = "all"

    if (this.hasInputTarget) {
      this.inputTarget.value = ""
    }

    this.updateUrl()
    this.filter()
  }

  matchesStatus(row) {
    if (this.currentStatus === "all") return true

    if (this.currentStatus === "debt") {
      return row.dataset.customerHasDebt === "true"
    }

    if (this.currentStatus === "attention") {
      return row.dataset.customerNeedsAttention === "true"
    }

    return row.dataset.customerStatus === this.currentStatus
  }

  updateResultsCount(visibleCount) {
    if (!this.hasResultsCountTarget) return

    const label = visibleCount === 1 ? this.singularValue : this.pluralValue
    this.resultsCountTarget.textContent = `${visibleCount} ${label}`
  }

  updateEmptyState(visibleCount) {
    if (!this.hasEmptyStateTarget) return

    this.emptyStateTarget.classList.toggle("hidden", visibleCount !== 0)
  }

  updateFilterButtons() {
    if (!this.hasFilterButtonTarget) return

    this.filterButtonTargets.forEach((button) => {
      const isActive = button.dataset.filterValue === this.currentStatus

      button.classList.toggle("border-unel-verde", isActive)
      button.classList.toggle("bg-unel-verde", isActive)
      button.classList.toggle("text-white", isActive)

      button.classList.toggle("border-unel-crema-2", !isActive)
      button.classList.toggle("bg-white", !isActive)
      button.classList.toggle("text-unel-humo", !isActive)
      button.classList.toggle("hover:border-unel-dorado", !isActive)
      button.classList.toggle("hover:text-unel-dorado", !isActive)
    })
  }

  updateActiveLabel() {
    if (!this.hasActiveLabelTarget) return

    const activeButton = this.filterButtonTargets.find((button) => {
      return button.dataset.filterValue === this.currentStatus
    })

    this.activeLabelTarget.textContent = activeButton?.dataset.filterLabel || "Todos"
  }

  updateUrl() {
    const url = new URL(window.location.href)

    if (this.currentStatus === "all") {
      url.searchParams.delete("status")
    } else {
      url.searchParams.set("status", this.currentStatus)
    }

    window.history.replaceState({}, "", url)
  }

  normalize(value) {
    return value
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }
}