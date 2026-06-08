# Decisions — UNEL Conservas

Este archivo registra decisiones importantes del proyecto. Debe actualizarse cuando se tome una decisión técnica, de producto o de flujo.

## Decisiones actuales

### 1. Desarrollo por módulos

El proyecto se construirá por módulos en este orden:

1. Costeo de productos.
2. Inventario.
3. Finanzas y deudas.
4. Clientes y ventas.
5. Plataforma de ventas.

Motivo: este orden permite construir primero la base interna del negocio antes de abrir funcionalidades de venta online.

---

### 2. Primero funcionalidad, luego mejoras visuales avanzadas

La prioridad inicial será que cada módulo funcione correctamente y sea entendible. Después se mejorará la interfaz y experiencia de usuario.

Motivo: evitar invertir demasiado tiempo en detalles visuales antes de validar los flujos principales.

---

### 3. M1 debe cerrarse antes de avanzar fuerte a M2

El Módulo 1 debe revisarse antes de implementar inventario.

Motivo: inventario probablemente dependerá de productos, costos y estructura base creada en M1.

---

### 4. La app debe estar pensada para una pyme

Las vistas, nombres de campos y flujos deben ser claros para usuarios no técnicos.

Motivo: el cliente necesita una herramienta usable, no solo una app técnicamente correcta.

---

### 5. El proyecto debe ser replicable

Cada módulo debe pensarse como una pieza reutilizable para futuras pymes.

Motivo: el objetivo de Auge no es solo resolver UNEL, sino aprender y construir una base que pueda adaptarse a otros clientes.

## Decisiones pendientes

- [ ] Definir si inventario manejará productos terminados, materias primas o ambos desde el inicio.
- [ ] Definir si las ventas descontarán stock automáticamente desde M2 o si eso se dejará para M4.
- [ ] Definir qué datos exactos debe tener un cliente en M4.
- [ ] Definir si M5 será solo catálogo al inicio o si incluirá pedidos online completos.
- [ ] Definir qué reportes financieros son realmente necesarios para M3.
