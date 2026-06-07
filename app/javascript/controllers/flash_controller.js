import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Cuando la alerta aparece en pantalla, iniciamos un temporizador de 5 segundos
    this.timeout = setTimeout(() => {
      this.close()
    }, 5000)
  }

  close() {
    // Este método borra el HTML de la alerta de la pantalla
    this.element.remove()
  }

  disconnect() {
    // Medida de seguridad: limpiar el temporizador si el usuario cambia de página rápido
    clearTimeout(this.timeout)
  }
}
