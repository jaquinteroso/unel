import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "row", "emptyState", "resultsCount"]

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
      this.resultsCountTarget.textContent = `${visibleCount} producto${visibleCount === 1 ? "" : "s"}`
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