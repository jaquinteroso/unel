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
