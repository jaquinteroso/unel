import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template"]

  connect() {
    this.index = this.containerTarget.children.length
    this.refreshAllUnitOptions()
  }

  add() {
    const content = this.templateTarget.innerHTML.replaceAll("__INDEX__", this.index)

    this.containerTarget.insertAdjacentHTML("beforeend", content)
    this.index += 1

    const newItem = this.containerTarget.lastElementChild
    this.updateUnitOptionsForItem(newItem)

    this.dispatch("changed")
  }

  remove(event) {
    const item = event.target.closest("[data-recipe-item]")

    if (!item) return

    const destroyField = item.querySelector("[data-destroy-field]")

    if (destroyField) {
      destroyField.value = "true"
      item.classList.add("hidden")
    } else {
      item.remove()
    }

    this.dispatch("changed")
  }

  updateUnitOptions(event) {
    const item = event.target.closest("[data-recipe-item]")

    if (!item) return

    this.updateUnitOptionsForItem(item)
    this.dispatch("changed")
  }

  refreshAllUnitOptions() {
    this.containerTarget.querySelectorAll("[data-recipe-item]").forEach((item) => {
      this.updateUnitOptionsForItem(item)
    })
  }

  updateUnitOptionsForItem(item) {
    const ingredientSelect = item.querySelector("[data-ingredient-select]")
    const unitSelect = item.querySelector("[data-unit-select]")

    if (!ingredientSelect || !unitSelect) return

    const selectedOption = ingredientSelect.selectedOptions[0]
    const ingredientUnit = selectedOption?.dataset.unit
    const compatibleUnits = this.compatibleUnitsFor(selectedOption)
    const currentValue = unitSelect.dataset.currentValue || unitSelect.value

    unitSelect.innerHTML = ""

    if (!ingredientSelect.value || compatibleUnits.length === 0) {
      unitSelect.disabled = true

      const option = document.createElement("option")
      option.value = ""
      option.textContent = "Selecciona ingrediente"

      unitSelect.appendChild(option)
      unitSelect.dataset.currentValue = ""

      return
    }

    unitSelect.disabled = false

    compatibleUnits.forEach((unit) => {
      const option = document.createElement("option")
      option.value = unit
      option.textContent = unit

      unitSelect.appendChild(option)
    })

    if (compatibleUnits.includes(currentValue)) {
      unitSelect.value = currentValue
    } else if (compatibleUnits.includes(ingredientUnit)) {
      unitSelect.value = ingredientUnit
    } else {
      unitSelect.value = compatibleUnits[0]
    }

    unitSelect.dataset.currentValue = unitSelect.value
  }

  compatibleUnitsFor(option) {
    const compatibleUnits = option?.dataset.compatibleUnits

    if (compatibleUnits) {
      return compatibleUnits
        .split(",")
        .map((unit) => unit.trim())
        .filter(Boolean)
    }

    const unit = option?.dataset.unit

    const fallbackUnits = {
      kg: ["kg", "g"],
      g: ["g"],
      l: ["l", "ml"],
      ml: ["ml"],
      unidad: ["unidad"]
    }

    return fallbackUnits[unit] || []
  }
}