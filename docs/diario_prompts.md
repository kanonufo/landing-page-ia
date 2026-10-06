# Diario de Prompts — ResumIA (Unidad 2)

Evidencia del proceso de creación asistida por IA (Google AI Studio / Gemini).
Regla del entregable: **no se aceptan capturas de chat sin transcripción**; este
documento transcribe cada prompt completo y registra las decisiones tomadas.

Estado: **borrador de trabajo**. Las observaciones se afinan con cada fase
(deben explicar por qué se aceptó, modificó o rechazó cada respuesta).

Leyenda de fases: F1 = planificación · F2 = copy/HTML · F3 = CSS · F4 = JS · F5 = publicación.

| # | Fase / tema | Prompt utilizado (texto completo) | Observaciones y decisiones tomadas |
|---|---|---|---|
| 1 | Contexto base (reutilizable) | `[CONTEXTO] Estoy creando una landing page para "ResumIA", una startup ficticia de IA que convierte PDFs en resumenes. [AUDIENCIA] estudiantes y profesionales. [RESTRICCIONES] HTML semantico, CSS mobile-first, JavaScript vanilla, sin frameworks, nomenclatura BEM, accesibilidad WCAG 2.1 AA, codigo comentado. [FORMATO] Devuelve solo el codigo, sin explicaciones.` | Se reutilizó como prefijo en los prompts de código. Fijó las restricciones técnicas que la IA respetó en todas las respuestas (BEM, sin frameworks, accesibilidad). |
| 2 | Estructura y plan | `Actua como desarrollador frontend. Propon la estructura de secciones de una landing page de acceso anticipado (hero + beneficios + formulario + footer) y justifica el orden pensando en la conversion.` | Se aceptó el orden hero → beneficios → formulario → footer. Se descartó añadir secciones en esa etapa para no distraer del objetivo único de conversión (captura de leads). |
| 3 | Hero | `Genera el HTML semantico del hero con: etiqueta, titular con propuesta de valor, subtitulo, CTA que enlaza al formulario (#registro) y una imagen (assets/hero.svg). Usa BEM con el bloque "hero" y anade atributos de accesibilidad.` | Se aceptó la estructura. Ajuste manual: titular y subtítulo finales, y atributos `loading="eager"` y `fetchpriority="high"` para el LCP. La imagen luego se movió a `assets/images/hero.svg`. |
| 4 | Beneficios | `Crea una seccion de 3 beneficios (Rapido, Preciso, Privado) usando una lista <ul>, cada tarjeta con icono SVG inline, titulo <h3> y texto. Nomenclatura BEM (bloque "beneficio"). Iconos decorativos con aria-hidden="true".` | Se aceptó el patrón de tarjetas con iconos SVG inline con `aria-hidden="true"`. Se anotó como deuda: el entregable exige mínimo 4 beneficios (se completará en Fase 2). |
| 5 | Formulario de captura | `Crea un formulario accesible con: nombre (texto, requerido), email (requerido), perfil (select con opciones), checkbox de consentimiento. Cada campo con <label>, aria-describedby apuntando a su mensaje de error y boton de envio. Usa novalidate para controlar la validacion con JavaScript.` | Se aceptó. Decisiones: `novalidate` en el form, `aria-describedby` por campo y mensajes con `role="alert"` y `hidden`. |
| 6 | CSS (mobile-first) | `Escribe el CSS con variables :root, reset, botones reutilizables, y estilos para hero, beneficios, formulario y footer. Movil primero y media query en 768px. Incluye :focus-visible, contraste AA y prefers-reduced-motion.` | Se aceptó la base mobile-first con variables y `prefers-reduced-motion`. Observación: solo se generó el breakpoint de 768px; el entregable pide 480px y 1200px (se corregirá en Fase 3). |
| 7 | JavaScript (validación) | `Escribe JavaScript vanilla (sin frameworks) que valide el formulario al enviar: nombre (min 2), email (regex), perfil (no vacio) y consentimiento (marcado). Muestra errores por campo, usa aria-invalid, enfoca el primer campo con error y muestra un mensaje de exito. Limpia errores al salir del campo.` | Se aceptó el patrón de reglas por campo + `mostrarError()`. Ajuste: la validación en `blur` solo se activa tras el primer intento de envío para evitar errores prematuros. El código quedó con `var` (se refactorizará a `const`/`let` en Fase 4). |
| 8 | Accesibilidad y revisión | `Revisa el codigo contra WCAG 2.1 AA: contraste de color, foco visible, textos alternativos, etiquetas de formulario y regiones de error. Indica mejoras.` | Revisión cruzada útil: se consolidaron foco visible, textos alternativos y regiones de error. Pendiente verificar contraste con WebAIM en Fase 3. |

<!--
PENDIENTES DE COMPLETAR (según el plan de la Unidad 2):
- Mínimo 15 prompts documentados (van 8).
- Mínimo 3 prompts con iteración (inicial + refinamiento).
- Mínimo 1 prompt de depuración con error real (formato "debería X pero hace Y").
- La columna de observaciones debe explicar el POR QUÉ de aceptar/modificar/rechazar.
- Formato final de entrega: tabla en Word/PDF.
-->
