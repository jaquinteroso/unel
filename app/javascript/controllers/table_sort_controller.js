import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["select", "body", "row"]

  connect() {
    this.storageKey = this.buildStorageKey()

    this.rowTargets.forEach((row, index) => {
      if (!row.dataset.sortOriginalIndex) {
        row.dataset.sortOriginalIndex = index.toString()
      }
    })

    const savedSort = localStorage.getItem(this.storageKey)

    if (savedSort && this.hasSelectTarget && this.optionExists(savedSort)) {
      this.selectTarget.value = savedSort
      this.sort()
    }
  }

  sort() {
    if (!this.hasSelectTarget || !this.hasBodyTarget) return

    const sortType = this.selectTarget.value
    const rows = Array.from(this.rowTargets)

    localStorage.setItem(this.storageKey, sortType)

    const sortConfig = this.parseSortType(sortType)

    rows.sort((a, b) => {
      if (!sortConfig) {
        return this.compareNumber(a.dataset.sortOriginalIndex, b.dataset.sortOriginalIndex)
      }

      const { key, direction } = sortConfig
      return this.compareRows(a, b, key, direction)
    })

    rows.forEach((row) => {
      this.bodyTarget.appendChild(row)
    })
  }

  buildStorageKey() {
    const path = window.location.pathname
    const selectId = this.hasSelectTarget ? this.selectTarget.id : "default"

    return `unelTableSort:${path}:${selectId}`
  }

  optionExists(value) {
    return Array.from(this.selectTarget.options).some((option) => {
      return option.value === value
    })
  }

  parseSortType(sortType) {
    const match = sortType.match(/^(.*)_(asc|desc)$/)

    if (!match) return null

    return {
      key: match[1],
      direction: match[2]
    }
  }

  compareRows(rowA, rowB, key, direction) {
    const valueA = this.readSortValue(rowA, key)
    const valueB = this.readSortValue(rowB, key)

    const aIsBlank = this.isBlank(valueA)
    const bIsBlank = this.isBlank(valueB)

    if (aIsBlank && bIsBlank) {
      return this.compareNumber(rowA.dataset.sortOriginalIndex, rowB.dataset.sortOriginalIndex)
    }

    if (aIsBlank) return 1
    if (bIsBlank) return -1

    const result = this.compareValues(valueA, valueB)

    if (result === 0) {
      return this.compareNumber(rowA.dataset.sortOriginalIndex, rowB.dataset.sortOriginalIndex)
    }

    return direction === "desc" ? -result : result
  }

  readSortValue(row, key) {
    const datasetKey = this.datasetKeyFor(key)

    return row.dataset[datasetKey]
  }

  datasetKeyFor(key) {
    const camelKey = key
      .split("_")
      .map((part) => this.capitalize(part))
      .join("")

    return `sort${camelKey}`
  }

  capitalize(value) {
    if (!value) return ""

    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  compareValues(a, b) {
    const numberA = this.parseNumber(a)
    const numberB = this.parseNumber(b)

    if (numberA !== null && numberB !== null) {
      return numberA - numberB
    }

    return this.compareText(a, b)
  }

  compareText(a, b) {
    return this.normalizeText(a).localeCompare(this.normalizeText(b), "es")
  }

  compareNumber(a, b) {
    return Number(a || 0) - Number(b || 0)
  }

  parseNumber(value) {
    if (this.isBlank(value)) return null

    const normalizedValue = value
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()

    const number = Number(normalizedValue)

    return Number.isNaN(number) ? null : number
  }

  normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  isBlank(value) {
    return value === undefined || value === null || value.toString().trim() === ""
  }
}