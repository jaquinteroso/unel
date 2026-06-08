import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["select", "body", "row"]

  connect() {
    const savedSort = localStorage.getItem("productsTableSort")

    if (savedSort && this.hasSelectTarget) {
      this.selectTarget.value = savedSort
      this.sort()
    }
  }

  sort() {
    const sortType = this.selectTarget.value
    const rows = Array.from(this.rowTargets)

    localStorage.setItem("productsTableSort", sortType)

    rows.sort((a, b) => {
      switch (sortType) {
        case "name_asc":
          return this.compareText(a.dataset.sortName, b.dataset.sortName)

        case "name_desc":
          return this.compareText(b.dataset.sortName, a.dataset.sortName)

        case "price_desc":
          return this.compareNumber(b.dataset.sortPrice, a.dataset.sortPrice)

        case "price_asc":
          return this.compareNumber(a.dataset.sortPrice, b.dataset.sortPrice)

        case "cost_desc":
          return this.compareNumber(b.dataset.sortCost, a.dataset.sortCost)

        case "cost_asc":
          return this.compareNumber(a.dataset.sortCost, b.dataset.sortCost)

        case "stock_asc":
          return this.compareNumber(a.dataset.sortStock, b.dataset.sortStock)

        case "stock_desc":
          return this.compareNumber(b.dataset.sortStock, a.dataset.sortStock)

        case "margin_desc":
          return this.compareNumber(b.dataset.sortMargin, a.dataset.sortMargin)

        case "margin_asc":
          return this.compareNumber(a.dataset.sortMargin, b.dataset.sortMargin)

        case "suggested_price_desc":
          return this.compareNumber(b.dataset.sortSuggestedPrice, a.dataset.sortSuggestedPrice)

        case "suggested_price_asc":
          return this.compareNumber(a.dataset.sortSuggestedPrice, b.dataset.sortSuggestedPrice)

        default:
          return 0
      }
    })

    rows.forEach((row) => {
      this.bodyTarget.appendChild(row)
    })
  }

  compareText(a, b) {
    return this.normalizeText(a).localeCompare(this.normalizeText(b), "es")
  }

  compareNumber(a, b) {
    return this.parseNumber(a) - this.parseNumber(b)
  }

  normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  parseNumber(value) {
    return Number(value || 0)
  }
}