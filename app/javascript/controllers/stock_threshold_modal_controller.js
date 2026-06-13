import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "input"]

  connect() {
  }

  open() {
    if (!this.hasModalTarget) {
      console.error("No se encontró el target modal")
      return
    }

    this.modalTarget.classList.remove("hidden")
    document.body.classList.add("overflow-hidden")

    requestAnimationFrame(() => {
      if (this.hasInputTarget) {
        this.inputTarget.focus()
        this.inputTarget.select()
      }
    })
  }

  close() {
    if (!this.hasModalTarget) return

    this.modalTarget.classList.add("hidden")
    document.body.classList.remove("overflow-hidden")
  }

  closeWithEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }
}