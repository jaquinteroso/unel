import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "cost",
    "margin",
    "price",
    "stock",
    "suggestedPrice",
    "summaryCost",
    "summaryMargin",
    "summarySuggestedPrice",
    "summaryFinalPrice",
    "summaryPriceDifference",
    "summaryStock"
  ]

  connect() {
    this.calculate()
  }

  calculate() {
    const costText = this.costTarget.value
    const marginText = this.marginTarget.value
    const priceText = this.priceTarget.value
    const stockText = this.stockTarget.value

    const cost = this.parseNumber(costText)
    const margin = this.parseNumber(marginText)
    const finalPrice = this.parseNumber(priceText)
    const stock = this.parseNumber(stockText)

    const hasCost = costText !== "" && cost > 0
    const hasMargin = marginText !== ""
    const hasFinalPrice = priceText !== ""
    const hasStock = stockText !== ""

    this.summaryCostTarget.textContent = hasCost ? this.formatCurrency(cost) : "Pendiente"
    this.summaryMarginTarget.textContent = hasMargin ? this.formatPercent(margin) : "Pendiente"
    this.summaryFinalPriceTarget.textContent = hasFinalPrice ? this.formatCurrency(finalPrice) : "Pendiente"
    this.summaryStockTarget.textContent = hasStock ? this.formatStock(stock) : "Pendiente"

    if (hasCost && hasMargin) {
      const suggestedPrice = cost * (1 + margin / 100)

      this.suggestedPriceTarget.textContent = this.formatCurrency(suggestedPrice)
      this.summarySuggestedPriceTarget.textContent = this.formatCurrency(suggestedPrice)

      this.suggestedPriceTarget.classList.remove("text-unel-humo")
      this.suggestedPriceTarget.classList.add("text-unel-carbon")

      if (hasFinalPrice) {
        const difference = finalPrice - suggestedPrice
        this.summaryPriceDifferenceTarget.textContent = this.formatDifference(difference)
      } else {
        this.summaryPriceDifferenceTarget.textContent = "Pendiente"
      }
    } else {
      this.suggestedPriceTarget.textContent = "Pendiente"
      this.summarySuggestedPriceTarget.textContent = "Pendiente"
      this.summaryPriceDifferenceTarget.textContent = "Pendiente"

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

  formatStock(value) {
    if (value <= 0) return "Sin stock inicial"
    return `${value} unidad${value === 1 ? "" : "es"}`
  }

  formatDifference(value) {
    const rounded = Math.round(value)

    if (rounded === 0) return "Sin diferencia"

    if (rounded > 0) {
      return `+${this.formatCurrency(rounded)} sobre sugerido`
    }

    return `${this.formatCurrency(Math.abs(rounded))} bajo sugerido`
  }
}