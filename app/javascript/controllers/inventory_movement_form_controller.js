import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "productSelect",
    "typeInput",
    "quantityInput",
    "quantityLabel",
    "quantityHelp",
    "currentStock",
    "threshold",
    "resultingStock",
    "difference",
    "statusBadge",
    "selectedProductName",
    "reasonSelect",
    "warning",
    "submitButton"
  ]

  static values = {
    backendReady: Boolean
  }

  connect() {
    this.update()
  }

  update() {
    this.updateQuantityCopy()
    this.updateReasonOptions()
    this.updatePreview()
  }

  updateQuantityCopy() {
    const movementType = this.selectedMovementType()

    if (!this.hasQuantityLabelTarget || !this.hasQuantityHelpTarget) return

    if (movementType === "entry") {
      this.quantityLabelTarget.textContent = "Cantidad a ingresar"
      this.quantityHelpTarget.textContent = "Suma unidades al stock actual del producto."
      return
    }

    if (movementType === "exit") {
      this.quantityLabelTarget.textContent = "Cantidad a retirar"
      this.quantityHelpTarget.textContent = "Resta unidades por venta, merma o retiro."
      return
    }

    this.quantityLabelTarget.textContent = "Nuevo stock real"
    this.quantityHelpTarget.textContent = "Reemplaza el stock actual por el conteo real."
  }

  updateReasonOptions() {
    if (!this.hasReasonSelectTarget) return

    const movementType = this.selectedMovementType()
    const options = Array.from(this.reasonSelectTarget.options)

    options.forEach((option) => {
      const allowedTypes = option.dataset.types

      if (!allowedTypes) {
        option.hidden = false
        return
      }

      option.hidden = !allowedTypes.split(",").includes(movementType)
    })

    const selectedOption = this.reasonSelectTarget.selectedOptions[0]

    if (selectedOption?.hidden) {
      const firstVisibleOption = options.find((option) => !option.hidden && option.value)
      this.reasonSelectTarget.value = firstVisibleOption?.value || ""
    }
  }

  updatePreview() {
    const selectedOption = this.productSelectTarget.selectedOptions[0]
    const movementType = this.selectedMovementType()
    const quantity = this.parseNumber(this.quantityInputTarget.value)

    const productName = selectedOption?.dataset.name || "Selecciona un producto"
    const currentStock = this.parseNumber(selectedOption?.dataset.stock)
    const threshold = this.parseNumber(selectedOption?.dataset.threshold)

    let resultingStock = currentStock

    if (movementType === "entry") {
      resultingStock = currentStock + quantity
    } else if (movementType === "exit") {
      resultingStock = currentStock - quantity
    } else {
      resultingStock = quantity
    }

    const difference = resultingStock - currentStock

    this.selectedProductNameTarget.textContent = productName
    this.currentStockTarget.textContent = `${currentStock} unidades`
    this.thresholdTarget.textContent = `${threshold} unidades`
    this.resultingStockTarget.textContent = `${resultingStock} unidades`
    this.differenceTarget.textContent = this.formatDifference(difference)

    this.updateStatus(resultingStock, threshold)
    this.updateWarning(movementType, resultingStock)
    this.updateSubmitState(resultingStock)
  }

  selectedMovementType() {
    const checkedType = this.typeInputTargets.find((input) => input.checked)
    return checkedType?.value || "entry"
  }

  updateStatus(stock, threshold) {
    if (!this.hasStatusBadgeTarget) return

    if (stock <= 0) {
      this.statusBadgeTarget.textContent = "Agotado"
      this.statusBadgeTarget.className = "inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
      return
    }

    if (stock <= threshold) {
      this.statusBadgeTarget.textContent = "Stock bajo"
      this.statusBadgeTarget.className = "inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
      return
    }

    this.statusBadgeTarget.textContent = "Disponible"
    this.statusBadgeTarget.className = "inline-flex rounded-full border border-unel-crema-2 bg-white px-3 py-1 text-xs font-semibold text-unel-verde"
  }

  updateWarning(movementType, resultingStock) {
    if (!this.hasWarningTarget) return

    if (movementType === "exit" && resultingStock < 0) {
      this.warningTarget.classList.remove("hidden")
      this.warningTarget.textContent = "La salida dejaría el stock en negativo. Revisa la cantidad antes de guardar."
      return
    }

    this.warningTarget.classList.add("hidden")
    this.warningTarget.textContent = ""
  }

  updateSubmitState(resultingStock) {
    if (!this.hasSubmitButtonTarget) return

    const productSelected = Boolean(this.productSelectTarget.value)
    const quantityValid = this.parseNumber(this.quantityInputTarget.value) >= 0
    const negativeStock = resultingStock < 0
    const shouldDisable = !this.backendReadyValue || !productSelected || !quantityValid || negativeStock

    this.submitButtonTarget.disabled = shouldDisable
  }

  formatDifference(value) {
    if (value > 0) return `+${value} unidades`
    if (value < 0) return `${value} unidades`
    return "Sin cambio"
  }

  parseNumber(value) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
}