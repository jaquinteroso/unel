import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["labelsContainer", "labelTemplate"]

  connect() {
    this.index = this.labelsContainerTarget.children.length + Date.now()
  }

  addLabel() {
    const content = this.labelTemplateTarget.innerHTML.replaceAll("__LABEL_INDEX__", this.index)

    this.labelsContainerTarget.insertAdjacentHTML("beforeend", content)
    this.index += 1
  }

  removeLabel(event) {
    const item = event.target.closest("[data-label-item]")
    if (!item) return

    const destroyField = item.querySelector("[data-destroy-field]")

    if (destroyField) {
      destroyField.value = "true"
      item.classList.add("hidden")
    } else {
      item.remove()
    }

    this.element.dispatchEvent(new Event("input", { bubbles: true }))
  }
}
