import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "row", "emptyState", "resultsCount"]

  static values = {
    singular: { type: String, default: "producto" },
    plural: { type: String, default: "productos" }
  }

  connect() {
    this.filter()
  }

  filter() {
    const query = this.normalize(this.inputTarget.value)
    let visibleCount = 0

    this.rowTargets.forEach((row) => {
      const text = this.normalize(row.dataset.searchText || row.textContent)
      const matches = query === "" || text.includes(query)

      row.classList.toggle("hidden", !matches)

      if (matches) {
        visibleCount += 1
      }
    })

    if (this.hasEmptyStateTarget) {
      this.emptyStateTarget.classList.toggle("hidden", visibleCount !== 0 || query === "")
    }

    if (this.hasResultsCountTarget) {
      const label = visibleCount === 1 ? this.singularValue : this.pluralValue
      this.resultsCountTarget.textContent = `${visibleCount} ${label}`
    }
  }

  clear() {
    this.inputTarget.value = ""
    this.filter()
    this.inputTarget.focus()
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