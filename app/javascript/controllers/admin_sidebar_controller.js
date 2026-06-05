import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sidebar", "label", "compactLabel"]

  toggle() {
    this.sidebarTarget.classList.toggle("w-64")
    this.sidebarTarget.classList.toggle("w-20")
    this.sidebarTarget.classList.toggle("text-center")

    this.labelTargets.forEach((label) => {
      label.classList.toggle("hidden")
    })

    this.compactLabelTargets.forEach((label) => {
      label.classList.toggle("hidden")
    })
  }
}