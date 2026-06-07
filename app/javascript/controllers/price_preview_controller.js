import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // Aquí declaramos todas las variables que Pedro conectó en el HTML
  static targets = [ "cost", "margin", "price", "stock", "suggestedPrice", "summaryCost", "summaryMargin", "summarySuggestedPrice", "summaryFinalPrice", "summaryPriceDifference", "summaryStock" ]

  connect() {
    // Apenas carga la página, hacemos el cálculo por si ya hay datos guardados
    this.calculate()
  }

  calculate() {
    // 1. Obtenemos los números de los campos (si están vacíos, usamos 0)
    const cost = parseFloat(this.costTarget.value) || 0
    const margin = parseFloat(this.marginTarget.value) || 0
    const finalPrice = parseFloat(this.priceTarget.value) || 0
    const stock = parseInt(this.stockTarget.value) || 0

    // 2. La fórmula matemática
    const suggested = cost * (1 + (margin / 100))
    const difference = finalPrice - suggested

    // 3. Formateador oficial para Pesos Chilenos (CLP)
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    })

    // 4. Actualizamos el recuadro del "Precio Sugerido"
    if (this.hasSuggestedPriceTarget) {
      this.suggestedPriceTarget.textContent = formatter.format(suggested)
      // Le ponemos color verde para que destaque
      this.suggestedPriceTarget.classList.add("text-unel-verde", "font-bold")
    }

    // 5. (Opcional) Si Pedro dejó la caja de "Resumen" al final, esto la actualiza en vivo también
    if (this.hasSummaryCostTarget) this.summaryCostTarget.textContent = formatter.format(cost)
    if (this.hasSummaryMarginTarget) this.summaryMarginTarget.textContent = `${margin}%`
    if (this.hasSummarySuggestedPriceTarget) this.summarySuggestedPriceTarget.textContent = formatter.format(suggested)
    if (this.hasSummaryFinalPriceTarget) this.summaryFinalPriceTarget.textContent = formatter.format(finalPrice)
    if (this.hasSummaryStockTarget) this.summaryStockTarget.textContent = `${stock} unidades`

    if (this.hasSummaryPriceDifferenceTarget) {
      this.summaryPriceDifferenceTarget.textContent = formatter.format(difference)
      if (difference < 0) {
        this.summaryPriceDifferenceTarget.className = "font-bold text-red-600"
      } else if (difference > 0) {
        this.summaryPriceDifferenceTarget.className = "font-bold text-green-600"
      } else {
        this.summaryPriceDifferenceTarget.className = "font-semibold text-unel-carbon"
      }
    }
  }
}
