import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    requestAnimationFrame(() => {
      this.removeAttachmentButton()
    })
  }

  rejectFile(event) {
    event.preventDefault()
  }

  removeAttachmentButton() {
    const wrapper = this.element.closest(".unel-product-description-trix")

    if (!wrapper) return

    const attachButton = wrapper.querySelector("[data-trix-action='attachFiles']")
    const fileToolsGroup = attachButton?.closest(".trix-button-group")

    if (fileToolsGroup) {
      fileToolsGroup.remove()
    }
  }
}