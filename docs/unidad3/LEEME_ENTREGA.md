# Unidad 3 — qué se entrega y qué queda pendiente

**Sitio publicado:** <https://kanonufo.github.io/landing-page-ia/>
**Repositorio:** <https://github.com/kanonufo/landing-page-ia>

## Entregables listos

| Entregable | Archivo principal | Estado |
|---|---|---|
| E3.0 | `E30_repositorio/reflexion_repositorio.pdf` y `issues_y_project.pdf` | Listo. Issues #1–#6 creados y cerrados con referencia a commits. |
| E3.1 | `E31_auditoria/informe_auditoria.pdf` + `codigo_original.html` + `codigo_corregido.html` | Listo. 14 hallazgos, ciclo AVIA, comparación antes/después y protocolo de 12 ítems. |
| E3.2 | `E32_persistencia/diseno_persistencia.pdf` + `demo_persistencia.mp4` | Listo. Video de 2 min 11 s con subtítulos y evidencias de DevTools. |
| E3.3 | `E33_sistema/sistema_diseno.pdf` | Listo. 16 tokens documentados, 4 snippets, 4 prompts CREDA y Lighthouse. |
| E3.4 | `E34_memoria/memoria.pdf` + `guion_presentacion.pdf` | Listo. Memoria de 12 páginas y guion de 10 minutos. |

## Evidencias verificadas

- Consola del sitio final: **0 errores** y **0 respuestas 4xx**.
- Lighthouse: **Performance 97–100**, **Accessibility 100**, **Best Practices 100**, **SEO 100**.
- Formulario: autoguardado, restauración, envío `POST` 200, limpieza del borrador y usuario convertido.
- Responsive: capturas a 375, 768 y 1280 px.
- GitHub Pages: URL pública con la versión nueva (FAQ, contador y persistencia).

## Pendientes que requieren tu cuenta o tu voz

1. **GitHub Project (tablero Kanban).** El token de `gh` no tiene el permiso `project` y GitHub rechazó la creación por API. Ejecuta:
   ```bash
   gh auth refresh -s project,read:project
   gh project create --owner kanonufo --title "ResumIA - Unidad 3"
   ```
   Luego crea las 8 tarjetas de `issues_y_project.pdf` y vincula los Issues #1–#6.
2. **Presentación oral de 10 minutos.** El guion está en `E34_memoria/guion_presentacion.pdf`; la exposición debes hacerla tú.
3. **Formspree en producción (opcional).** La demo usa `https://httpbin.org/post` para verificar el POST sin cuenta. Para recibir correos reales, cambia `data-endpoint` en `index.html` por `https://formspree.io/f/TU_ID`.
4. **Video.** Está generado y subtitulado. Si la rúbrica exige que se vea el panel *Application* con las claves completas, vuelve a grabar el segmento con la ventana de DevTools más ancha; en el video actual las claves aparecen truncadas por el ancho del panel.

## Nota sobre el historial

El repositorio conserva el historial real de la Unidad 2 (20 commits del 5 de octubre) y añade 8 confirmaciones de la Unidad 3. No se alteraron fechas de autor. Si la rúbrica exige distribución en cuatro sesiones distintas, el historial no puede demostrarlo hacia atrás sin reescribir fechas; se documenta el trabajo real.

## Archivos grandes

- `E32_persistencia/demo_persistencia.mp4` (3.7 MB).
- `E34_memoria/memoria.pdf` (3.8 MB).
- `docs/unidad3/capturas/*.png` (evidencias de consola, Application, Network, Lighthouse y responsive).

Todo el contenido está también en el repositorio, en `docs/unidad3/`.
