import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "cost",
    "margin",
    "suggestedPrice",
    "summaryCost",
    "summaryMargin",
    "summarySuggestedPrice"
  ]

  connect() {
    this.calculate()
  }

  calculate() {
    const cost = this.parseNumber(this.costTarget.value)
    const marginValue = this.marginTarget.value
    const margin = this.parseNumber(marginValue)

    const hasCost = cost > 0
    const hasMargin = marginValue !== ""

    if (this.hasSummaryCostTarget) {
      this.summaryCostTarget.textContent = hasCost ? this.formatCurrency(cost) : "Pendiente"
    }

    if (this.hasSummaryMarginTarget) {
      this.summaryMarginTarget.textContent = hasMargin ? this.formatPercent(margin) : "Pendiente"
    }

    if (hasCost && hasMargin) {
      const suggestedPrice = cost * (1 + margin / 100)

      this.suggestedPriceTarget.textContent = this.formatCurrency(suggestedPrice)

      if (this.hasSummarySuggestedPriceTarget) {
        this.summarySuggestedPriceTarget.textContent = this.formatCurrency(suggestedPrice)
      }

      this.suggestedPriceTarget.classList.remove("text-unel-humo")
      this.suggestedPriceTarget.classList.add("text-unel-carbon")
    } else {
      this.suggestedPriceTarget.textContent = "Pendiente"

      if (this.hasSummarySuggestedPriceTarget) {
        this.summarySuggestedPriceTarget.textContent = "Pendiente"
      }

      this.suggestedPriceTarget.classList.remove("text-unel-carbon")
      this.suggestedPriceTarget.classList.add("text-unel-humo")
    }
  }

  parseNumber(value) {
    if (!value) return 0

    return Number(value.toString().replace(",", ".")) || 0
  }

  formatCurrency(value) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(value)
  }

  formatPercent(value) {
    return `${new Intl.NumberFormat("es-CL", {
      maximumFractionDigits: 1
    }).format(value)}%`
  }
}