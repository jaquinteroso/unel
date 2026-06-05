import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sidebar", "label"]

  connect() {
    this.highlightActiveLink()
  }

  toggle() {
    this.sidebarTarget.classList.toggle("w-64")
    this.sidebarTarget.classList.toggle("w-20")
    this.sidebarTarget.classList.toggle("text-center")

    this.labelTargets.forEach((label) => {
      label.classList.toggle("hidden")
    })
  }

  highlightActiveLink() {
    const currentPath = window.location.pathname
    const links = this.element.querySelectorAll("[data-active-path]")

    links.forEach((link) => {
      const activePath = link.dataset.activePath

      if (currentPath.startsWith(activePath)) {
        this.activateLink(link)
      } else {
        this.deactivateLink(link)
      }
    })
  }

  activateLink(link) {
    link.classList.remove(
      "bg-unel-verde",
      "text-unel-blanco",
      "text-unel-crema",
      "border-transparent"
    )

  link.classList.add(
      "text-unel-dorado-2",
      "border-unel-dorado-2"
    )
  }

  deactivateLink(link) {
    link.classList.remove(
      "bg-unel-verde",
      "text-unel-blanco",
      "text-unel-dorado",
      "border-unel-dorado"
    )

    link.classList.add(
      "text-unel-crema",
      "border-transparent",
      "hover:border-unel-dorado",
      "hover:text-unel-dorado"
    )
  }
}