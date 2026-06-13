# Roadmap — Unel Conservas

Este roadmap proviene de la planificación inicial del proyecto. Jorge indicó que el Módulo 1 ya está bastante avanzado y debería estar casi listo, pero falta revisión.

## Estado general

| Módulo | Nombre | Prioridad | Estado actual |
|---|---|---|---|
| M1 | Costeo de productos | 1 — Primero | En revisión / casi listo |
| M2 | Inventario | 2 — Segundo | Pendiente |
| M3 | Finanzas y deudas | 3 — Tercero | Pendiente |
| M4 | Clientes y ventas | 4 — Cuarto | Pendiente |
| M5 | Plataforma de ventas | 5 — Último | Pendiente |

---

## M1 — Costeo de productos

### Objetivo

Registrar ingredientes, cantidades y costos por producto. Calcular costo unitario, precio de venta y margen automáticamente.

### Requerimientos del cliente

- Poder ingresar los ingredientes de cada producto y su costo.
- Ver automáticamente cuánto cuesta producir cada producto.
- Definir el margen de ganancia deseado.
- Obtener un precio de venta sugerido según el margen.

### Tareas planificadas

| Tarea | Tipo | Prioridad | Estado sugerido |
|---|---|---|---|
| Formulario de recetas | Frontend | Alta | En revisión |
| Cálculo de costo unitario | Backend | Alta | En revisión |
| Margen y precio sugerido | Backend | Alta | En revisión |
| Vista de tabla de productos | Frontend | Media | En revisión |

### Revisión pendiente antes de cerrar M1

- Confirmar que el formulario permite ingresar todos los datos necesarios.
- Confirmar que el cálculo de costo unitario es correcto.
- Confirmar que el margen se aplica de forma coherente.
- Confirmar que el precio sugerido se muestra claramente.
- Revisar validaciones de campos obligatorios.
- Revisar casos vacíos o datos incompletos.
- Revisar que la tabla de productos sea clara para el cliente.
- Probar crear, editar y eliminar registros si esas acciones existen.
- Revisar que los nombres usados en la interfaz sean entendibles para la pyme.

---

## M2 — Inventario

### Objetivo

Controlar stock de productos terminados y materias primas. Registrar entradas y salidas. Crear alertas de stock mínimo.

### Requerimientos del cliente

- Ver cuánto stock hay disponible de cada producto en tiempo real.
- Registrar cuando se produce más stock.
- Registrar cuando se vende.
- Recibir alerta cuando un producto está por agotarse.

### Tareas planificadas

| Tarea | Tipo | Prioridad | Estado |
|---|---|---|---|
| Registro de stock inicial | Frontend | Alta | Pendiente |
| Movimientos de inventario | Backend | Alta | Pendiente |
| Alertas de stock mínimo | Backend | Media | Pendiente |

### Dependencias

- M1 debe estar revisado, porque inventario puede conectarse con productos y costos.
- Se debe definir si el stock se manejará por producto terminado, materia prima o ambos desde el inicio.
- Se debe definir si las salidas de stock estarán conectadas inmediatamente con ventas o si se hará primero manual.

---

## M3 — Finanzas y deudas

### Objetivo

Registrar ingresos, gastos, deudas propias y flujo de caja mensual.

### Requerimientos del cliente

- Registrar todos los gastos e ingresos del negocio.
- Ver cuánto dinero se debe, a quién y con fecha de vencimiento.
- Ver resumen mensual de si el negocio está ganando o perdiendo.

### Tareas planificadas

| Tarea | Tipo | Prioridad | Estado |
|---|---|---|---|
| Registro de ingresos y gastos | Frontend | Alta | Pendiente |
| Control de deudas propias | Frontend | Alta | Pendiente |
| Flujo de caja mensual | Frontend | Media | Pendiente |

---

## M4 — Clientes y ventas

### Objetivo

Organizar clientes, registrar ventas y visualizar cuentas por cobrar.

### Requerimientos del cliente

- Tener todos los clientes organizados en un solo lugar.
- Registrar cada venta con cliente, productos y monto.
- Ver fácilmente qué clientes tienen deudas pendientes.

### Tareas planificadas

| Tarea | Tipo | Prioridad | Estado |
|---|---|---|---|
| Base de datos de clientes | Backend | Alta | Pendiente |
| Registro de pedidos | Frontend | Alta | Pendiente |
| Cuentas por cobrar | Frontend | Alta | Pendiente |

### Nota

La planificación original indica que existe un Excel de contactos del cliente que debería solicitarse antes de migrar clientes.

---

## M5 — Plataforma de ventas

### Objetivo

Crear un catálogo digital de productos con fotos, descripciones y precios. Luego permitir pedidos online conectados con inventario y clientes.

### Requerimientos del cliente

- Tener un catálogo digital para mostrar productos y precios.
- Permitir que clientes hagan pedidos sin depender completamente de WhatsApp.

### Tareas planificadas

| Tarea | Tipo | Prioridad | Estado |
|---|---|---|---|
| Catálogo digital | Frontend | Media | Pendiente |
| Sistema de pedidos online | Backend | Media | Pendiente |

### Dependencias

- M1, M2 y M4 deberían estar listos o al menos bien encaminados antes de iniciar M5.
