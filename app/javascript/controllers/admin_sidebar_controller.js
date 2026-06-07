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
    "activeIndicator",
    "overlay"
  ]

  connect() {
    this.desktopQuery = window.matchMedia("(min-width: 1024px)")
    this.handleScreenChange = () => this.syncSidebarMode()

    this.desktopQuery.addEventListener("change", this.handleScreenChange)

    this.highlightActiveLink()
    this.syncSidebarMode()
  }

  disconnect() {
    if (this.desktopQuery && this.handleScreenChange) {
      this.desktopQuery.removeEventListener("change", this.handleScreenChange)
    }
  }

  toggle() {
    if (this.isDesktop()) {
      this.toggleDesktopCollapse()
    } else {
      this.toggleMobileMenu()
    }
  }

  isDesktop() {
    return this.desktopQuery.matches
  }

  syncSidebarMode() {
    if (this.isDesktop()) {
      this.closeMobileMenu()

      const isCollapsed = localStorage.getItem("unelSidebarCollapsed") === "true"
      this.setCollapsed(isCollapsed)
    } else {
      this.setCollapsed(false)
      this.closeMobileMenu()
    }
  }

  toggleDesktopCollapse() {
    const isCurrentlyCollapsed = this.sidebarTarget.classList.contains("w-20")
    const nextState = !isCurrentlyCollapsed

    this.setCollapsed(nextState)
    localStorage.setItem("unelSidebarCollapsed", nextState)
  }

  toggleMobileMenu() {
    const isOpen = this.sidebarTarget.classList.contains("translate-x-0")

    if (isOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  openMobileMenu() {
    this.sidebarTarget.classList.remove("-translate-x-full")
    this.sidebarTarget.classList.add("translate-x-0")

    if (this.hasOverlayTarget) {
      this.overlayTarget.classList.remove("hidden")
    }
  }

  closeMobileMenu() {
    this.sidebarTarget.classList.remove("translate-x-0")
    this.sidebarTarget.classList.add("-translate-x-full")

    if (this.hasOverlayTarget) {
      this.overlayTarget.classList.add("hidden")
    }
  }

  setCollapsed(isCollapsed) {
    if (isCollapsed) {
      this.sidebarTarget.classList.remove("w-64")
      this.sidebarTarget.classList.add("w-20", "text-center")

      this.brandTarget.classList.remove("mb-10")
      this.brandTarget.classList.add("mb-8")

      this.navTarget.classList.remove("space-y-8")
      this.navTarget.classList.add("space-y-5")

      this.logoutWrapperTarget.classList.remove("mt-10")
      this.logoutWrapperTarget.classList.add("mt-6")

      this.labelTargets.forEach((label) => {
        label.classList.add("hidden")
      })

      this.navItemTargets.forEach((item) => {
        item.classList.remove("justify-start", "gap-3", "px-4", "py-3", "mt-2")
        item.classList.add("justify-center", "gap-0", "px-0", "py-2", "mt-1")
      })

      this.sectionHeaderTargets.forEach((header) => {
        header.classList.remove("mb-3")
        header.classList.add("mb-2")
      })

      this.sectionDividerTargets.forEach((divider) => {
        divider.classList.remove("hidden")
      })
    } else {
      this.sidebarTarget.classList.remove("w-20", "text-center")
      this.sidebarTarget.classList.add("w-64")

      this.brandTarget.classList.remove("mb-8")
      this.brandTarget.classList.add("mb-10")

      this.navTarget.classList.remove("space-y-5")
      this.navTarget.classList.add("space-y-8")

      this.logoutWrapperTarget.classList.remove("mt-6")
      this.logoutWrapperTarget.classList.add("mt-10")

      this.labelTargets.forEach((label) => {
        label.classList.remove("hidden")
      })

      this.navItemTargets.forEach((item) => {
        item.classList.remove("justify-center", "gap-0", "px-0", "py-2", "mt-1")
        item.classList.add("justify-start", "gap-3", "px-4", "py-3", "mt-2")
      })

      this.sectionHeaderTargets.forEach((header) => {
        header.classList.remove("mb-2")
        header.classList.add("mb-3")
      })

      this.sectionDividerTargets.forEach((divider) => {
        divider.classList.add("hidden")
      })
    }
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