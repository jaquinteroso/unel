import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "input",
    "row",
    "emptyState",
    "resultsCount",
    "filterButton",
    "paymentButton",
    "activeStatusLabel",
    "activePaymentLabel"
  ]

  static values = {
    initialStatus: { type: String, default: "all" },
    initialPayment: { type: String, default: "all" },
    singular: { type: String, default: "pedido" },
    plural: { type: String, default: "pedidos" }
  }

  connect() {
    this.currentStatus = this.initialStatusValue || "all"
    this.currentPayment = this.initialPaymentValue || "all"
    this.filter()
  }

  setStatusFilter(event) {
    event.preventDefault()

    this.currentStatus = event.currentTarget.dataset.filterValue || "all"
    this.updateUrl()
    this.filter()
  }

  setPaymentFilter(event) {
    event.preventDefault()

    this.currentPayment = event.currentTarget.dataset.paymentValue || "all"
    this.updateUrl()
    this.filter()
  }

  filter() {
    const query = this.hasInputTarget ? this.normalize(this.inputTarget.value) : ""
    let visibleCount = 0

    this.rowTargets.forEach((row) => {
      const matchesStatus = this.matchesStatus(row)
      const matchesPayment = this.matchesPayment(row)
      const searchableText = this.normalize(row.dataset.searchText || row.textContent)
      const matchesQuery = query === "" || searchableText.includes(query)
      const isVisible = matchesStatus && matchesPayment && matchesQuery

      row.classList.toggle("hidden", !isVisible)

      if (isVisible) {
        visibleCount += 1
      }
    })

    this.updateResultsCount(visibleCount)
    this.updateEmptyState(visibleCount)
    this.updateStatusButtons()
    this.updatePaymentButtons()
    this.updateActiveLabels()
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
    this.currentPayment = "all"

    if (this.hasInputTarget) {
      this.inputTarget.value = ""
    }

    this.updateUrl()
    this.filter()
  }

  matchesStatus(row) {
    if (this.currentStatus === "all") return true

    if (this.currentStatus === "attention") {
      return row.dataset.orderNeedsAttention === "true"
    }

    return row.dataset.orderStatus === this.currentStatus
  }

  matchesPayment(row) {
    if (this.currentPayment === "all") return true

    if (this.currentPayment === "overdue") {
      return row.dataset.orderPaymentOverdue === "true"
    }

    if (this.currentPayment === "debt") {
      return row.dataset.orderHasDebt === "true"
    }

    return row.dataset.paymentStatus === this.currentPayment
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

  updateStatusButtons() {
    if (!this.hasFilterButtonTarget) return

    this.filterButtonTargets.forEach((button) => {
      const isActive = button.dataset.filterValue === this.currentStatus
      this.toggleButtonState(button, isActive)
    })
  }

  updatePaymentButtons() {
    if (!this.hasPaymentButtonTarget) return

    this.paymentButtonTargets.forEach((button) => {
      const isActive = button.dataset.paymentValue === this.currentPayment
      this.toggleButtonState(button, isActive)
    })
  }

  toggleButtonState(button, isActive) {
    button.classList.toggle("border-unel-verde", isActive)
    button.classList.toggle("bg-unel-verde", isActive)
    button.classList.toggle("text-white", isActive)

    button.classList.toggle("border-unel-crema-2", !isActive)
    button.classList.toggle("bg-white", !isActive)
    button.classList.toggle("text-unel-humo", !isActive)
    button.classList.toggle("hover:border-unel-dorado", !isActive)
    button.classList.toggle("hover:text-unel-dorado", !isActive)
  }

  updateActiveLabels() {
    if (this.hasActiveStatusLabelTarget) {
      const activeStatusButton = this.filterButtonTargets.find((button) => {
        return button.dataset.filterValue === this.currentStatus
      })

      this.activeStatusLabelTarget.textContent = activeStatusButton?.dataset.filterLabel || "Todos"
    }

    if (this.hasActivePaymentLabelTarget) {
      const activePaymentButton = this.paymentButtonTargets.find((button) => {
        return button.dataset.paymentValue === this.currentPayment
      })

      this.activePaymentLabelTarget.textContent = activePaymentButton?.dataset.paymentLabel || "Todos"
    }
  }

  updateUrl() {
    const url = new URL(window.location.href)

    if (this.currentStatus === "all") {
      url.searchParams.delete("status")
    } else {
      url.searchParams.set("status", this.currentStatus)
    }

    if (this.currentPayment === "all") {
      url.searchParams.delete("payment")
    } else {
      url.searchParams.set("payment", this.currentPayment)
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