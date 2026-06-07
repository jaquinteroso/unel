import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  prevent(event) {
    if (event.key === "Enter") {
      // 1. Si estamos en el editor de texto (Trix) o un textarea, dejamos que el Enter haga su trabajo (un salto de línea).
      if (event.target.tagName === "TRIX-EDITOR" || event.target.tagName === "TEXTAREA") {
        return
      }
      
      // 2. Bloqueamos el envío del formulario
      event.preventDefault()
      
      // 3. Sacamos el cursor del input actual (tal como lo pediste)
      event.target.blur()
    }
  }
}
