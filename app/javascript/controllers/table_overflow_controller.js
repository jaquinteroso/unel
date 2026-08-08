import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["scroll", "hint"]

  connect() {
    this.check = this.check.bind(this)

    requestAnimationFrame(this.check)
    window.addEventListener("resize", this.check)

    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(this.check)
      this.resizeObserver.observe(this.scrollTarget)
    }
  }

  disconnect() {
    window.removeEventListener("resize", this.check)

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  check() {
    if (!this.hasScrollTarget || !this.hasHintTarget) return

    const isOverflowing = this.scrollTarget.scrollWidth > this.scrollTarget.clientWidth + 2
    const canScrollRight =
      this.scrollTarget.scrollLeft + this.scrollTarget.clientWidth < this.scrollTarget.scrollWidth - 2

    this.hintTarget.classList.toggle("is-visible", isOverflowing)
    this.element.classList.toggle("is-overflowing", isOverflowing && canScrollRight)
  }
}