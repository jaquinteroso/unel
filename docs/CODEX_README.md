# README — Contexto para Codex

Copia estos archivos en tu proyecto Rails:

- `AGENTS.md` debe ir en la raíz del proyecto.
- La carpeta `docs/` debe ir en la raíz del proyecto.
- Los archivos dentro de `docs/` ayudan a Codex a entender el proyecto, el roadmap y la tarea actual.

## Uso recomendado con Codex

Desde la raíz del proyecto:

```bash
codex
```

Primer prompt sugerido:

```text
Lee AGENTS.md, docs/PROJECT_CONTEXT.md, docs/ROADMAP.md, docs/CURRENT_TASK.md y docs/DECISIONS.md.

No edites archivos todavía.

Quiero que actúes como asesor técnico del proyecto.
Primero dime:
1. qué entiendes del proyecto,
2. en qué estado estamos,
3. qué archivos reales deberías revisar para cerrar el Módulo 1,
4. qué riesgos ves,
5. cuál sería el siguiente paso más lógico.
```
