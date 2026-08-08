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
    this.sectionHeaderHandlers = new Map()
    this.isInitializing = true

    this.handleScreenChange = () => this.syncSidebarMode()
    this.handleHeightChange = () => this.syncSidebarMode()

    this.desktopQuery.addEventListener("change", this.handleScreenChange)
    window.addEventListener("resize", this.handleHeightChange)

    this.setupSectionAccordions()
    this.highlightActiveLink()
    this.syncSidebarMode()

    this.isInitializing = false
  }

  disconnect() {
    if (this.desktopQuery && this.handleScreenChange) {
      this.desktopQuery.removeEventListener("change", this.handleScreenChange)
    }

    window.removeEventListener("resize", this.handleHeightChange)

    this.sectionHeaderHandlers.forEach((handler, header) => {
      header.removeEventListener("click", handler)
    })
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

  currentHeightMode() {
    const height = window.innerHeight

    if (height < 610) return "accordion"
    if (height < 760) return "dense"
    if (height < 880) return "compact"

    return "normal"
  }

  shouldUseAccordions() {
    return this.currentHeightMode() === "accordion" && !this.isCollapsed()
  }

  isCollapsed() {
    return this.sidebarTarget.classList.contains("w-20")
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

    this.applyAccordionMode(false)
  }

  toggleDesktopCollapse() {
    const nextState = !this.isCollapsed()

    this.setCollapsed(nextState)
    localStorage.setItem("unelSidebarCollapsed", nextState)
    this.applyAccordionMode(false)
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
      this.applyCollapsedSpacing()
    } else {
      this.sidebarTarget.classList.remove("w-20", "text-center")
      this.sidebarTarget.classList.add("w-64")

      this.labelTargets.forEach((label) => {
        label.classList.remove("hidden")
      })

      this.sectionDividerTargets.forEach((divider) => {
        divider.classList.add("hidden")
      })

      this.applyExpandedHeightSpacing()
    }
  }

  applyCollapsedSpacing() {
    const mode = this.currentHeightMode()
    const isLowHeight = mode === "dense" || mode === "accordion"

    this.sidebarTarget.classList.remove("w-64")
    this.sidebarTarget.classList.add("w-20", "text-center")

    this.sidebarTarget.classList.remove("py-6", "py-5", "py-4", "py-3")
    this.sidebarTarget.classList.add(isLowHeight ? "py-3" : "py-4")

    this.brandTarget.classList.remove("mb-10", "mb-8", "mb-7", "mb-6", "mb-5", "mb-4")
    this.brandTarget.classList.add(isLowHeight ? "mb-4" : "mb-5")

    this.navTarget.classList.remove("space-y-8", "space-y-6", "space-y-5", "space-y-4", "space-y-3", "space-y-2")
    this.navTarget.classList.add(isLowHeight ? "space-y-2" : "space-y-3")

    this.logoutWrapperTarget.classList.remove("mt-10", "mt-6", "mt-4", "mt-3", "mt-2", "pt-6", "pt-4", "pt-3", "pt-2")
    this.logoutWrapperTarget.classList.add(isLowHeight ? "mt-2" : "mt-3", isLowHeight ? "pt-2" : "pt-3")

    this.labelTargets.forEach((label) => {
      label.classList.add("hidden")
    })

    this.navItemTargets.forEach((item) => {
      item.classList.remove(
        "justify-start",
        "gap-3",
        "px-4",
        "py-3",
        "py-2.5",
        "py-2",
        "py-1.5",
        "mt-2",
        "mt-1"
      )

      item.classList.add(
        "justify-center",
        "gap-0",
        "px-0",
        isLowHeight ? "py-1.5" : "py-2",
        "mt-1"
      )

      item.style.fontSize = ""
    })

    this.sectionHeaderTargets.forEach((header) => {
      header.classList.remove("mb-3", "mb-2", "mb-1")
      header.classList.add("mb-1")
    })

    this.applySectionHeaderTypography("0.65rem", "0.8rem")

    this.sectionDividerTargets.forEach((divider) => {
      divider.classList.remove("hidden")
    })
  }

  applyExpandedHeightSpacing() {
    const mode = this.currentHeightMode()

    if (mode === "normal") {
      this.applyExpandedNormalSpacing()
    } else if (mode === "compact") {
      this.applyExpandedCompactSpacing()
    } else if (mode === "dense") {
      this.applyExpandedDenseSpacing()
    } else {
      this.applyExpandedAccordionSpacing()
    }
  }

  applyExpandedNormalSpacing() {
    this.sidebarTarget.classList.remove("py-6", "py-5", "py-4", "py-3")
    this.sidebarTarget.classList.add("py-4")

    this.brandTarget.classList.remove("mb-10", "mb-8", "mb-7", "mb-6", "mb-5", "mb-4")
    this.brandTarget.classList.add("mb-6")

    this.navTarget.classList.remove("space-y-8", "space-y-6", "space-y-5", "space-y-4", "space-y-3", "space-y-2")
    this.navTarget.classList.add("space-y-4")

    this.logoutWrapperTarget.classList.remove("mt-10", "mt-6", "mt-4", "mt-3", "mt-2", "pt-6", "pt-4", "pt-3", "pt-2")
    this.logoutWrapperTarget.classList.add("mt-3", "pt-3")

    this.navItemTargets.forEach((item) => {
      item.classList.remove(
        "justify-center",
        "gap-0",
        "px-0",
        "py-3",
        "py-2",
        "py-1.5",
        "mt-2"
      )

      item.classList.add("justify-start", "gap-3", "px-4", "py-2.5", "mt-1")
      item.style.fontSize = ""
    })

    this.sectionHeaderTargets.forEach((header) => {
      header.classList.remove("mb-3", "mb-1")
      header.classList.add("mb-2")
    })

    this.applySectionHeaderTypography("", "")
  }

  applyExpandedCompactSpacing() {
    this.sidebarTarget.classList.remove("py-6", "py-5", "py-4", "py-3")
    this.sidebarTarget.classList.add("py-4")

    this.brandTarget.classList.remove("mb-10", "mb-8", "mb-7", "mb-6", "mb-4")
    this.brandTarget.classList.add("mb-5")

    this.navTarget.classList.remove("space-y-8", "space-y-6", "space-y-5", "space-y-4", "space-y-2")
    this.navTarget.classList.add("space-y-3")

    this.logoutWrapperTarget.classList.remove("mt-10", "mt-6", "mt-4", "pt-6", "pt-4", "pt-2")
    this.logoutWrapperTarget.classList.add("mt-3", "pt-3")

    this.navItemTargets.forEach((item) => {
      item.classList.remove(
        "justify-center",
        "gap-0",
        "px-0",
        "py-3",
        "py-2.5",
        "py-1.5",
        "mt-2"
      )

      item.classList.add("justify-start", "gap-3", "px-4", "py-2", "mt-1")
      item.style.fontSize = "0.8125rem"
    })

    this.sectionHeaderTargets.forEach((header) => {
      header.classList.remove("mb-3", "mb-2")
      header.classList.add("mb-1")
    })

    this.applySectionHeaderTypography("0.68rem", "0.85rem")
  }

  applyExpandedDenseSpacing() {
    this.sidebarTarget.classList.remove("py-6", "py-5", "py-4")
    this.sidebarTarget.classList.add("py-3")

    this.brandTarget.classList.remove("mb-10", "mb-8", "mb-7", "mb-6", "mb-5")
    this.brandTarget.classList.add("mb-4")

    this.navTarget.classList.remove("space-y-8", "space-y-6", "space-y-5", "space-y-4", "space-y-3")
    this.navTarget.classList.add("space-y-2")

    this.logoutWrapperTarget.classList.remove("mt-10", "mt-6", "mt-4", "mt-3", "pt-6", "pt-4", "pt-3")
    this.logoutWrapperTarget.classList.add("mt-2", "pt-2")

    this.navItemTargets.forEach((item) => {
      item.classList.remove(
        "justify-center",
        "gap-0",
        "px-0",
        "py-3",
        "py-2.5",
        "py-2",
        "mt-2"
      )

      item.classList.add("justify-start", "gap-3", "px-4", "py-1.5", "mt-1")
      item.style.fontSize = "0.76rem"
    })

    this.sectionHeaderTargets.forEach((header) => {
      header.classList.remove("mb-3", "mb-2")
      header.classList.add("mb-1")
    })

    this.applySectionHeaderTypography("0.62rem", "0.75rem")
  }

  applyExpandedAccordionSpacing() {
    this.applyExpandedDenseSpacing()
    this.applySectionHeaderTypography("0.62rem", "0.75rem")
  }

  applySectionHeaderTypography(fontSize, lineHeight) {
    this.sectionHeaderTargets.forEach((header) => {
      const title = header.querySelector("p")

      if (!title) return

      title.style.fontSize = fontSize
      title.style.lineHeight = lineHeight
    })
  }

  setupSectionAccordions() {
    this.sectionHeaderTargets.forEach((header) => {
      this.ensureSectionChevron(header)

      const handler = () => {
        if (!this.shouldUseAccordions()) return

        const section = header.parentElement
        this.openOnlySection(section)
      }

      header.addEventListener("click", handler)
      this.sectionHeaderHandlers.set(header, handler)
    })
  }

  applyAccordionMode(animate = false) {
    const sections = this.sidebarSections()

    if (!this.shouldUseAccordions()) {
      sections.forEach((section) => {
        this.setSectionOpen(section, true, false)
        this.setSectionHeaderState(section, false, true)
      })

      return
    }

    const activeSection = this.activeSection() || sections[0]

    sections.forEach((section) => {
      const isOpen = section === activeSection
      this.setSectionOpen(section, isOpen, animate && !this.isInitializing)
      this.setSectionHeaderState(section, true, isOpen)
    })
  }

  openOnlySection(sectionToOpen) {
    this.sidebarSections().forEach((section) => {
      const isOpen = section === sectionToOpen
      this.setSectionOpen(section, isOpen, true)
      this.setSectionHeaderState(section, true, isOpen)
    })
  }

  sidebarSections() {
    return Array.from(this.navTarget.children).filter((child) => {
      return child.querySelector("[data-admin-sidebar-target~='sectionHeader']")
    })
  }

  activeSection() {
    const activeLink = this.navItemTargets.find((item) => {
      return item.classList.contains("text-unel-dorado-2")
    })

    if (!activeLink) return null

    return activeLink.closest("nav > div")
  }

  isSectionActive(section) {
    return Boolean(
      section.querySelector("[data-admin-sidebar-target~='navItem'].text-unel-dorado-2")
    )
  }

  setSectionOpen(section, isOpen, animate = false) {
    const header = section.querySelector("[data-admin-sidebar-target~='sectionHeader']")

    Array.from(section.children).forEach((child) => {
      if (child === header) return

      if (animate) {
        this.animateSectionChild(child, isOpen)
      } else {
        child.getAnimations().forEach((animation) => animation.cancel())
        child.classList.toggle("hidden", !isOpen)
        child.style.height = ""
        child.style.opacity = ""
        child.style.overflow = ""
        child.style.transform = ""
      }
    })
  }

  animateSectionChild(child, shouldOpen) {
    child.getAnimations().forEach((animation) => animation.cancel())

    const duration = 170
    const easing = "ease-out"

    if (shouldOpen) {
      if (!child.classList.contains("hidden")) return

      child.classList.remove("hidden")

      const targetHeight = child.scrollHeight

      child.style.overflow = "hidden"
      child.style.height = "0px"
      child.style.opacity = "0"
      child.style.transform = "translateY(-4px)"

      const animation = child.animate(
        [
          { height: "0px", opacity: 0, transform: "translateY(-4px)" },
          { height: `${targetHeight}px`, opacity: 1, transform: "translateY(0)" }
        ],
        { duration, easing }
      )

      animation.onfinish = () => {
        child.style.height = ""
        child.style.opacity = ""
        child.style.overflow = ""
        child.style.transform = ""
      }

      return
    }

    if (child.classList.contains("hidden")) return

    const startHeight = child.scrollHeight

    child.style.overflow = "hidden"
    child.style.height = `${startHeight}px`
    child.style.opacity = "1"
    child.style.transform = "translateY(0)"

    const animation = child.animate(
      [
        { height: `${startHeight}px`, opacity: 1, transform: "translateY(0)" },
        { height: "0px", opacity: 0, transform: "translateY(-4px)" }
      ],
      { duration: 140, easing: "ease-in" }
    )

    animation.onfinish = () => {
      child.classList.add("hidden")
      child.style.height = ""
      child.style.opacity = ""
      child.style.overflow = ""
      child.style.transform = ""
    }
  }

  setSectionHeaderState(section, isInteractive, isOpen) {
    const header = section.querySelector("[data-admin-sidebar-target~='sectionHeader']")
    if (!header) return

    const title = header.querySelector("p")
    const isActive = this.isSectionActive(section)

    header.classList.toggle("cursor-pointer", isInteractive)
    header.classList.toggle("rounded-lg", isInteractive)
    header.classList.toggle("transition", isInteractive)
    header.classList.toggle("px-2", isInteractive)
    header.classList.toggle("py-1.5", isInteractive)
    header.classList.toggle("hover:bg-white/5", isInteractive)

    header.classList.remove("bg-white/5")

    if (title) {
      title.classList.toggle("text-unel-humo", !isActive)
      title.classList.toggle("text-unel-dorado-2", isActive)
    }

    if (isInteractive) {
      header.setAttribute("role", "button")
      header.setAttribute("aria-expanded", isOpen ? "true" : "false")
    } else {
      header.removeAttribute("role")
      header.removeAttribute("aria-expanded")
    }

    const chevron = header.querySelector("[data-sidebar-chevron]")
    if (chevron) {
      chevron.textContent = isOpen ? "−" : "+"
      chevron.classList.toggle("hidden", !isInteractive)
    }
  }

  ensureSectionChevron(header) {
    const title = header.querySelector("p")
    if (!title || title.querySelector("[data-sidebar-chevron]")) return

    title.classList.add("flex", "items-center", "justify-between", "gap-2")

    const chevron = document.createElement("span")
    chevron.dataset.sidebarChevron = "true"
    chevron.dataset.adminSidebarTarget = "label"
    chevron.className = "hidden text-xs font-bold text-unel-dorado"
    chevron.textContent = "+"

    title.appendChild(chevron)
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