import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  rejectFile(event) {
    event.preventDefault()
  }
}