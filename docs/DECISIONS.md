## Decisión: costo calculado desde receta

Para M1, el costo del producto debe calcularse desde los ingredientes asociados a su receta.

La fórmula base inicial será:

costo calculado = suma de cantidad usada × costo por unidad del ingrediente

El campo `products.cost` no se eliminará todavía para evitar romper funcionalidades existentes, pero el método `calculated_cost` será la referencia principal para el costeo real del módulo.

## Decisión: insumos de empaque separados de ingredientes

Para M1, frascos, tapas y etiquetas no se modelarán como ingredientes normales.

Se crea una entidad separada de insumos de empaque para mantener clara la diferencia entre:

- ingredientes o materias primas del producto,
- insumos necesarios para envasar una unidad terminada.

La fórmula oficial del costo unitario queda:

costo calculado = costo de ingredientes + costo de frasco + costo de tapa + costo de etiqueta

Esto deja el módulo preparado para que inventario y finanzas puedan distinguir más adelante entre materias primas e insumos de empaque.

## Decisión: etiquetas múltiples por producto

Un producto puede utilizar varias etiquetas simultáneamente. Frasco y tapa se mantienen como selecciones únicas, pero las etiquetas se asocian como una lista sin límite fijo.

Los tipos iniciales de etiqueta son:

- frontal,
- lateral,
- tapa,
- QR,
- otra.

Las etiquetas no requieren tamaño. Su clasificación principal es el tipo o ubicación donde se utilizan.

## Decisión: registro público de administradores deshabilitado

Las cuentas administrativas no pueden registrarse desde una ruta pública.

Los administradores oficiales se crean mediante `db/seeds.rb`. En producción, el correo y la contraseña inicial se entregan mediante las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

Devise conserva únicamente el inicio de sesión y la recuperación de contraseña para cuentas existentes.
