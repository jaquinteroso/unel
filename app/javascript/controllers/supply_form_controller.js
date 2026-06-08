import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["category", "sizeWrapper", "labelTypeWrapper", "unitMeasure", "packQuantityWrapper"]

  connect() {
    this.togglePackQuantity()
    this.toggleCategoryFields()
  }

  togglePackQuantity() {
    if (!this.hasPackQuantityWrapperTarget) return

    const isPack = this.unitMeasureTarget.value === "pack"
    this.packQuantityWrapperTarget.classList.toggle("hidden", !isPack)
  }

  toggleCategoryFields() {
    const isLabel = this.categoryTarget.value === "label"

    this.sizeWrapperTarget.classList.toggle("hidden", isLabel)
    this.labelTypeWrapperTarget.classList.toggle("hidden", !isLabel)
  }
}
