# Project Context — Auge / Unel Conservas

## Descripción general

Este proyecto corresponde al desarrollo de una aplicación web para Unel Conservas, trabajada como primer cliente dentro del emprendimiento Auge.

La aplicación busca ayudar a una pyme de conservas a ordenar áreas clave del negocio: costeo de productos, inventario, finanzas, clientes, ventas y eventualmente una plataforma de pedidos online.

## Objetivo del proyecto

Construir una web app funcional, mantenible y escalable que permita a la empresa:

- calcular costos reales de productos,
- definir márgenes y precios sugeridos,
- controlar inventario,
- registrar ingresos, gastos y deudas,
- organizar clientes y ventas,
- preparar una futura plataforma de pedidos.

## Enfoque de desarrollo

El proyecto se desarrolla de forma incremental por módulos.

Cada módulo debe quedar funcional, entendible y probado antes de avanzar al siguiente. La prioridad es construir una base sólida, no abrir demasiadas funcionalidades a la vez.

## Módulos principales

| Módulo | Nombre | Objetivo |
|---|---|---|
| M1 | Costeo de productos | Registrar ingredientes, cantidades y costos por producto. Calcular costo unitario, precio de venta y margen. |
| M2 | Inventario | Controlar stock de productos terminados y materias primas. Crear alertas de stock mínimo. |
| M3 | Finanzas y deudas | Registrar ingresos, gastos, deudas y flujo de caja mensual. |
| M4 | Clientes y ventas | Registrar clientes, pedidos, cuentas por cobrar e historial de ventas. |
| M5 | Plataforma de ventas | Crear catálogo digital y sistema de pedidos online conectado con inventario y clientes. |

## Estado actual informado por Jorge

El Módulo 1, Costeo de productos, está prácticamente terminado. Falta revisarlo, probarlo y cerrar detalles antes de avanzar fuerte al Módulo 2.

## Reglas importantes del proyecto

- No avanzar a un módulo nuevo sin revisar el módulo anterior.
- Cada cambio debe ser pequeño, claro y testeable.
- La app debe ser entendible para una pyme, no solo técnicamente correcta.
- Las vistas deben ser claras, ordenadas y fáciles de usar.
- El sistema debe evitar cálculos manuales innecesarios para el cliente.
- El código debe mantenerse simple y explicable.
- Las decisiones importantes deben anotarse en `docs/DECISIONS.md`.

## Criterios de calidad

Una funcionalidad se considera bien implementada cuando:

- carga sin errores,
- cumple el flujo esperado,
- tiene validaciones razonables,
- muestra datos de forma clara,
- calcula correctamente lo que promete,
- se puede probar manualmente,
- Jorge entiende cómo funciona.
