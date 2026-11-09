<div class="portada"><img src="../media/portada_e30.svg" alt="Portada del entregable E3.0"></div>

# E3.0 — Evidencias de gestión: Issues y tablero Kanban

**Repositorio:** <https://github.com/kanonufo/landing-page-ia>
**Sitio:** <https://kanonufo.github.io/landing-page-ia/>

## 1. Issues registrados

| N.º | Título | Etiqueta | Estado | Cierre |
|---|---|---|---|---|
| [#1](https://github.com/kanonufo/landing-page-ia/issues/1) | [BUG] Recurso del hero devuelve 404 por ruta de imagen desactualizada | `bug` | Cerrado | `e353b80`: publica `hero_resumia_v2.svg` y actualiza el `src`. |
| [#2](https://github.com/kanonufo/landing-page-ia/issues/2) | [MEJORA] Evitar que las tipografías de Google bloqueen el render | `mejora` | Cerrado | `e353b80`: añade `preload` y carga no bloqueante. |
| [#3](https://github.com/kanonufo/landing-page-ia/issues/3) | [TAREA] Implementar autoguardado y restauración del formulario | `tarea` | Cerrado | `e353b80`: módulo `form-persistence.js`. |
| [#4](https://github.com/kanonufo/landing-page-ia/issues/4) | [MEJORA] Añadir sección FAQ con acordeón accesible | `mejora` | Cerrado | `e353b80`: `faq.js` y sección FAQ. |
| [#5](https://github.com/kanonufo/landing-page-ia/issues/5) | [BUG] Enlace mailto del aviso legal sin contraste AA | `bug` | Cerrado | `e353b80`: color del enlace legal; Accessibility 100. |
| [#6](https://github.com/kanonufo/landing-page-ia/issues/6) | [TAREA] Documentar prompts, auditoría y memoria de la Unidad 3 | `documentacion` | Cerrado | `f8aa631`: PDFs, capturas y video publicados. |

Los Issues reflejan problemas reales del desarrollo: un 404 que rompía la ilustración del hero, una fuente que bloqueaba el render, un enlace con contraste insuficiente, la ausencia de persistencia y la falta del acordeón. Cada uno tiene título descriptivo, cuerpo con pasos o criterio de cierre, etiqueta y referencia al cambio que lo resolvió.

## 2. Tablero Kanban (8 tareas)

| Tarea | Columna | Criterio de verificación |
|---|---|---|
| Publicar `hero_resumia_v2.svg` y corregir el 404 | Completado | Cero respuestas 4xx en la pestaña Network. |
| Carga no bloqueante de tipografías | Completado | Lighthouse Performance ≥ 70 y sin cambios visuales. |
| Módulo de persistencia con claves `resumia_form_*` | Completado | Autoguardado y restauración probados con DevTools. |
| Lógica de usuario convertido y limpieza del borrador | Completado | Tras el envío solo quedan las claves de estado. |
| Envío `POST` con `fetch` y manejo de errores | Completado | Respuesta 200 y cuerpo verificado en Network. |
| Acordeón FAQ accesible | Completado | Apertura con teclado y `aria-expanded` correcto. |
| Contador de cohorte persistente | Completado | La fecha no se reinicia al recargar. |
| Documentación E3.0–E3.4 y evidencias | Completado | PDFs, capturas y video adjuntos. |

El tablero está creado y activo en <https://github.com/users/kanonufo/projects/3>, con 8 tarjetas: los Issues #1–#6 y dos borradores (envío POST y contador). Las columnas son `Por hacer`, `En progreso`, `En revisión` y `Completado`.

Para que el evaluador lo abra sin iniciar sesión y aparezca en la pestaña Projects del repositorio, deben quedar aplicados estos dos ajustes:

```bash
gh project edit 3 --owner "@me" --visibility PUBLIC
gh project link 3 --owner kanonufo --repo kanonufo/landing-page-ia
```

## 3. Historial de commits

El repositorio usa Conventional Commits. La Unidad 3 añade confirmaciones separadas por responsabilidad:

```text
e353b80 feat(landing): persistencia, snippets y sistema de diseno de la Unidad 3
eaa7dee docs(e30): portafolio, reflexion e issues del repositorio
9c7f07b docs(e31): auditoria critica, codigo original y codigo corregido
50a6619 docs(e32): diseno de persistencia, prompts y video de demostracion
feb63ab docs(e33): sistema de diseno, CREDA por snippet y evidencias
c872557 docs(e34): memoria de proceso, guion de presentacion y evidencias
f8aa631 chore(tools): scripts de captura, auditoria, video y construccion de PDFs
acd657e merge: Unidad 3 - persistencia, auditoria, sistema de componentes y memoria
```

Cada mensaje indica qué cambió y por qué; el historial se lee como una bitácora del producto, no como una lista de "update".

## 4. README y despliegue

El README incluye título y descripción del producto, captura de la landing, badge y URL de GitHub Pages, tecnologías, proceso de cinco fases, instrucciones de personalización, estructura de archivos y créditos. GitHub Pages publica la rama `master`; la URL responde públicamente y es la misma que se entrega en Moodle.
