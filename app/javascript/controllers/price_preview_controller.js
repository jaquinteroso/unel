import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // Aquí declaramos todas las variables que Pedro conectó en el HTML
  static targets = [
    "margin",
    "price",
    "stock",
    "suggestedPrice",
    "summaryIngredientCost",
    "summarySupplyCost",
    "summaryCost",
    "summaryMargin",
    "summarySuggestedPrice",
    "summaryFinalPrice",
    "summaryPriceDifference",
    "summaryStock",
    "summaryStockCost",
    "summaryStockSuggestedPrice",
    "summaryStockFinalPrice",
    "summaryStockPriceDifference",
    "supplySelect"
  ]

  connect() {
    // Apenas carga la página, hacemos el cálculo por si ya hay datos guardados
    this.calculate()
  }

  calculate() {
    // 1. Calculamos el costo desde receta + insumos de empaque
    const ingredientCost = this.recipeCost()
    const supplyCost = this.supplyCost()
    const cost = ingredientCost + supplyCost
    const margin = parseFloat(this.marginTarget.value) || 0
    const finalPrice = parseFloat(this.priceTarget.value) || 0
    const stock = parseInt(this.stockTarget.value) || 0

    // 2. La fórmula matemática
    const suggested = cost * (1 + (margin / 100))
    const difference = finalPrice - suggested
    const stockCost = cost * stock
    const stockSuggested = suggested * stock
    const stockFinal = finalPrice * stock
    const stockDifference = difference * stock

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
    this.summaryIngredientCostTargets.forEach((target) => target.textContent = formatter.format(ingredientCost))
    this.summarySupplyCostTargets.forEach((target) => target.textContent = formatter.format(supplyCost))
    this.summaryCostTargets.forEach((target) => target.textContent = formatter.format(cost))
    this.summaryMarginTargets.forEach((target) => target.textContent = `${margin}%`)
    this.summarySuggestedPriceTargets.forEach((target) => target.textContent = formatter.format(suggested))
    this.summaryFinalPriceTargets.forEach((target) => target.textContent = formatter.format(finalPrice))
    this.summaryStockTargets.forEach((target) => target.textContent = `${stock} unidades`)
    this.summaryStockCostTargets.forEach((target) => target.textContent = formatter.format(stockCost))
    this.summaryStockSuggestedPriceTargets.forEach((target) => target.textContent = formatter.format(stockSuggested))
    this.summaryStockFinalPriceTargets.forEach((target) => target.textContent = formatter.format(stockFinal))
    this.summaryStockPriceDifferenceTargets.forEach((target) => target.textContent = formatter.format(stockDifference))

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

  recipeCost() {
    return Array.from(this.element.querySelectorAll("[data-recipe-item]")).reduce((total, item) => {
      const destroyField = item.querySelector("[data-destroy-field]")
      if (destroyField?.value === "true") return total

      const selectedOption = item.querySelector("select option:checked")
      const quantityInput = item.querySelector("input[name*='[quantity]']")
      const unitCost = parseFloat(selectedOption?.dataset.cost) || 0
      const ingredientUnit = selectedOption?.dataset.unit
      const quantityUnit = item.querySelector("select[name*='[quantity_unit]']")?.value
      const quantity = parseFloat(quantityInput?.value) || 0

      return total + (unitCost * this.convertQuantity(quantity, quantityUnit, ingredientUnit))
    }, 0)
  }

  supplyCost() {
    return this.supplySelectTargets.reduce((total, select) => {
      const wrapper = select.closest("[data-product-supply]")
      const quantityInput = wrapper?.querySelector("[data-supply-quantity]")
      const unitCost = parseFloat(select.selectedOptions[0]?.dataset.cost) || 0
      const quantity = parseFloat(quantityInput?.value) || 0

      return total + (unitCost * quantity)
    }, 0)
  }

  convertQuantity(quantity, fromUnit, toUnit) {
    if (!fromUnit || !toUnit) return quantity
    if (fromUnit === toUnit) return quantity

    if (fromUnit === "g" && toUnit === "kg") return quantity / 1000
    if (fromUnit === "kg" && toUnit === "g") return quantity * 1000

    if (fromUnit === "ml" && toUnit === "l") return quantity / 1000
    if (fromUnit === "l" && toUnit === "ml") return quantity * 1000

    return quantity
  }
}
