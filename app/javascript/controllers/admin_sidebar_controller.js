import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "sidebar",
    "label",
    "brand",
    "nav",
    "navItem",
    "sectionHeader",
    "sectionDivider",
    "logoutWrapper",
    "activeIndicator"
  ]

  connect() {
    this.highlightActiveLink()
  }

  toggle() {
    this.sidebarTarget.classList.toggle("w-64")
    this.sidebarTarget.classList.toggle("w-20")
    this.sidebarTarget.classList.toggle("text-center")

    this.brandTarget.classList.toggle("mb-10")
    this.brandTarget.classList.toggle("mb-8")

    this.navTarget.classList.toggle("space-y-8")
    this.navTarget.classList.toggle("space-y-5")

    this.logoutWrapperTarget.classList.toggle("mt-10")
    this.logoutWrapperTarget.classList.toggle("mt-6")

    this.labelTargets.forEach((label) => {
      label.classList.toggle("hidden")
    })

    this.navItemTargets.forEach((item) => {
      item.classList.toggle("justify-start")
      item.classList.toggle("justify-center")

      item.classList.toggle("gap-3")
      item.classList.toggle("gap-0")

      item.classList.toggle("px-4")
      item.classList.toggle("px-0")

      item.classList.toggle("py-3")
      item.classList.toggle("py-2")

      item.classList.toggle("mt-2")
      item.classList.toggle("mt-1")
    })

    this.sectionHeaderTargets.forEach((header) => {
      header.classList.toggle("mb-3")
      header.classList.toggle("mb-2")
    })

    this.sectionDividerTargets.forEach((divider) => {
      divider.classList.toggle("hidden")
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
    link.classList.remove("text-unel-crema")
    link.classList.add("text-unel-dorado-2")

    const indicator = link.querySelector("[data-admin-sidebar-target='activeIndicator']")
    if (indicator) {
      indicator.classList.remove("hidden")
    }
  }

  deactivateLink(link) {
    link.classList.remove("text-unel-dorado-2")
    link.classList.add("text-unel-crema", "hover:text-unel-dorado")

    const indicator = link.querySelector("[data-admin-sidebar-target='activeIndicator']")
    if (indicator) {
      indicator.classList.add("hidden")
    }
  }
}