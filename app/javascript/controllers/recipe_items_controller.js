import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template"]

  connect() {
    this.index = this.containerTarget.children.length
  }

  add() {
    const content = this.templateTarget.innerHTML.replaceAll("__INDEX__", this.index)

    this.containerTarget.insertAdjacentHTML("beforeend", content)
    this.index += 1
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

    this.element.dispatchEvent(new Event("input", { bubbles: true }))
  }
}
