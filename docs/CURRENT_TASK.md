# Current Task — Revisión y cierre del Módulo 1

## Tarea actual

Revisar y cerrar el Módulo 1: Costeo de productos.

Jorge indicó que este módulo ya está bastante avanzado y probablemente casi listo, pero falta una revisión completa antes de darlo por terminado.

## Objetivo

Confirmar que el módulo de costeo funciona correctamente, es entendible para el cliente y deja una base sólida para avanzar al Módulo 2: Inventario.

## Archivos probablemente involucrados

Codex debe revisar los archivos reales del proyecto, especialmente:

- `config/routes.rb`
- `db/schema.rb`
- `app/models/`
- `app/controllers/`
- `app/views/`
- `app/javascript/`
- `app/assets/`
- `app/helpers/`
- `db/migrate/`

## Flujo esperado del módulo

El sistema debería permitir:

1. Crear o registrar productos.
2. Asociar ingredientes, cantidades y costos.
3. Calcular el costo unitario o costo total del producto.
4. Definir margen de ganancia.
5. Calcular o mostrar precio de venta sugerido.
6. Visualizar productos en una tabla clara.
7. Editar información relevante si corresponde.
8. Evitar datos inválidos o incompletos.

## Checklist de revisión técnica

- [ ] Revisar rutas relacionadas con productos, recetas, ingredientes o costos.
- [ ] Revisar modelos y relaciones.
- [ ] Revisar migraciones y `db/schema.rb`.
- [ ] Revisar validaciones.
- [ ] Revisar controladores.
- [ ] Revisar vistas principales.
- [ ] Revisar formularios.
- [ ] Revisar cálculos de costo.
- [ ] Revisar cálculo de margen y precio sugerido.
- [ ] Revisar tabla/listado de productos.
- [ ] Revisar mensajes de error o estados vacíos.
- [ ] Probar crear un caso real.
- [ ] Probar editar un caso real.
- [ ] Probar comportamiento con campos incompletos.
- [ ] Revisar que los nombres de interfaz sean claros para una pyme.

## Preguntas que Codex debería responder antes de avanzar

1. ¿La estructura actual del Módulo 1 es coherente?
2. ¿Qué modelos existen y cómo se relacionan?
3. ¿El cálculo de costos está en el lugar correcto?
4. ¿Hay lógica de negocio en vistas que debería moverse a modelos/helpers/services?
5. ¿Faltan validaciones importantes?
6. ¿La interfaz es suficientemente clara para el cliente?
7. ¿Qué cambio mínimo conviene hacer antes de cerrar M1?
8. ¿Qué deuda técnica queda pendiente?

## Definición de terminado

M1 se considera terminado cuando:

- el flujo principal funciona sin errores,
- los cálculos son correctos,
- la interfaz es entendible,
- los datos se guardan correctamente,
- hay validaciones mínimas,
- Jorge puede explicar cómo funciona,
- existe claridad sobre cómo se conectará con inventario en M2.

## Siguiente paso después de M1

Cuando M1 esté revisado, el siguiente paso recomendado será planificar e implementar M2: Inventario, empezando por definir si el stock inicial será por productos terminados, materias primas o ambos.
