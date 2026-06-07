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

    if (item) {
      item.remove()
    }
  }
}