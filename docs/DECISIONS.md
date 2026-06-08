## Decisión: costo calculado desde receta

Para M1, el costo del producto debe calcularse desde los ingredientes asociados a su receta.

La fórmula base será:

costo calculado = suma de cantidad usada × costo por unidad del ingrediente

El campo `products.cost` no se eliminará todavía para evitar romper funcionalidades existentes, pero el método `calculated_cost` será la referencia principal para el costeo real del módulo.
