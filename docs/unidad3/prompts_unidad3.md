# Diario de prompts — Unidad 3

Registro textual de los prompts usados en los entregables E3.1 a E3.4. Se conservan las restricciones y las iteraciones para que el proceso sea reproducible.

## E3.1 — Auditoría

### Generación inicial (código auditado)

```text
[ROL] Actúa como desarrollador frontend senior.
[CONTEXTO] Estoy construyendo la landing page de ResumIA, un producto ficticio que
resume PDFs con IA. El objetivo único es capturar correos para la beta.
[TAREA] Genera la sección de registro completa: formulario con nombre, correo,
perfil y consentimiento; validación en JavaScript; autoguardado en localStorage;
restauración al cargar; envío a un servicio externo; mensaje de éxito.
[RESTRICCIONES] HTML, CSS y JavaScript vanilla. Sin frameworks ni librerías.
[FORMATO] Devuelve un único archivo HTML con estilos y script incluidos.
```

### Corrección 1 — XSS

```text
El saludo usa innerHTML con datos del usuario. Reescribe esa parte para que el nombre
se trate como texto, no como HTML, y explica por qué textContent elimina el XSS.
Mantén el resto del comportamiento.
```

### Corrección 2 — red y estado

```text
Sustituye el XMLHttpRequest síncrono por fetch asíncrono con await, AbortController
y comprobación de response.ok. No uses document.write. Si el envío falla, conserva
los datos y muestra un mensaje accesible.
```

### Corrección 3 — persistencia

```text
Guarda cada campo con una clave namespaced resumia_form_*, envuelve localStorage en
try/catch, restaura solo si el valor existe y añade una marca resumia_usuario_convertido
para no volver a mostrar el formulario a quien ya se registró.
```

### Prompt base ajustado

```text
[ROL] Desarrollador frontend senior especializado en accesibilidad y seguridad.
[CONTEXTO] Landing page estática para GitHub Pages; formulario de captura de leads.
[TAREA] Genera el formulario y su lógica.
[RESTRICCIONES OBLIGATORIAS]
- Nada de innerHTML con datos de usuario: usar textContent o createElement.
- Nada de XHR síncrono ni document.write: fetch + async/await + AbortController.
- localStorage siempre dentro de try/catch y con claves namespaced.
- Prohibido registrar datos personales en consola.
- Etiquetas <label for>, aria-describedby, role="alert" y aria-live.
- Script al final del body, dentro de una IIFE, en modo estricto.
- Comprobar response.ok y manejar errores de red sin perder el borrador.
[FORMATO] HTML + CSS + JS separados y comentados.
```

## E3.2 — Persistencia

### P1 — Generación inicial

```text
Genera el JavaScript de un formulario de captura que guarde cada campo en
localStorage mientras el usuario escribe, restaure los valores al cargar y
envíe a un endpoint externo con fetch. Usa claves con prefijo resumia_form_,
modo estricto e IIFE. Sin frameworks.
```

### P2 — Corrección y ajuste

```text
El envío debe comprobar response.ok, usar AbortController y no perder el
borrador si falla la red. Añade un honeypot _gotcha y no registres datos
personales en consola. Mantén la validación accesible existente.
```

### P3 — Usuario ya convertido

```text
Añade una marca resumia_usuario_convertido en localStorage. Si existe, oculta
el formulario y muestra un mensaje de agradecimiento con el nombre guardado.
Tras un envío exitoso, limpia las claves del borrador y conserva solo la marca
y el nombre.
```

## E3.3 — Sistema de componentes

### Prompt maestro

```text
[ROL] Eres desarrollador frontend senior y diseñador de sistemas.
[CONTEXTO] Proyecto ResumIA: landing estática para GitHub Pages.
Sistema de diseño ya definido:
- Colores: primario #2563eb, primario oscuro #1d4ed8, acento #f59e0b,
  texto #334155, texto suave #475569, fondo #ffffff, fondo alt #f8fafc,
  borde #e2e8f0, error #dc2626, éxito #166534.
- Tipografías: Lora para títulos, Inter para cuerpo.
- Espaciado: 0.5 / 0.75 / 1.25 / 2 / 4 rem. Radios: 14px y 24px.
- Convención: resumia-[componente]__[elemento]--[estado].
[RESTRICCIONES] HTML5 semántico, CSS mobile-first con custom properties,
JavaScript ES6+ vanilla, sin frameworks ni librerías, accesibilidad WCAG 2.1 AA,
IIFE y script al final del body.
[FORMATO] Devuelve HTML, CSS y JS separados, comentados y listos para integrar.
```

### CREDA por snippet

```text
[SNIPPET 1 - HERO]
[C] Contexto: landing de ResumIA, beta de resúmenes de PDF, audiencia académica.
[R] Rol: desarrollador frontend senior con enfoque editorial.
[E] Ejemplo: composición de dos columnas, etiqueta, titular, subtítulo, dos CTA e imagen.
[D] Detalles: --color-primario, --color-acento, --fuente-titulos, --espacio-xl;
    imagen con width, height, loading="eager" y alt.
[A] Acción: entrega HTML y CSS mobile-first con BEM prefijado.

[SNIPPET 2 - FAQ]
[C] Contexto: objeciones antes del registro.
[R] Rol: especialista en accesibilidad WAI-ARIA.
[E] Ejemplo: botón con aria-expanded, panel con aria-controls y hidden, apertura exclusiva.
[D] Detalles: flechas, Home y End; icono +/- en CSS; foco visible; sin dependencias.
[A] Acción: entrega HTML, CSS e IIFE comentada.

[SNIPPET 3 - CONTADOR]
[C] Contexto: cierre de la cohorte beta en 14 días.
[R] Rol: desarrollador frontend orientado a conversión.
[E] Ejemplo: cuatro bloques días/horas/min/seg con role="timer".
[D] Detalles: fecha en resumia_countdown_fin, padStart(2,"0"), pausa al ocultar
    la pestaña, respeto de prefers-reduced-motion.
[A] Acción: entrega el bloque y una IIFE sin setInterval duplicado.

[SNIPPET 4 - PROGRESO]
[C] Contexto: página larga con varias secciones.
[R] Rol: desarrollador de interfaces con foco en rendimiento.
[E] Ejemplo: barra fija superior y botón circular inferior derecho.
[D] Detalles: transform: scaleX(), requestAnimationFrame, { passive: true },
    umbral de 480 px, prefers-reduced-motion.
[A] Acción: entrega HTML mínimo, CSS e IIFE.
```

## E3.4 — Memoria

### Prompt 1 — Exploración

```text
Actúa como estratega de producto. Define el buyer persona de una landing para
un asistente de IA que resume PDFs académicos: dolores, deseos, objeciones y
criterios de decisión. Devuelve una tabla y tres implicaciones para el copy.
```

### Prompt 2 — Definición

```text
Con el buyer persona anterior, propón la estructura de secciones y el copy del
hero. Una sola idea por sección, tono académico y claro, sin superlativos.
Incluye un titular de máximo 9 palabras y un subtítulo de máximo 35.
```

### Prompt 3 — Generación

```text
Genera el HTML semántico de la landing con las secciones acordadas. Usa BEM,
atributos ARIA donde aporten significado, imágenes con dimensiones y un
formulario accesible. Sin frameworks.
```

### Prompt 4 — Refinamiento

```text
Revisa el HTML contra WCAG 2.1 AA: contraste, foco visible, etiquetas,
jerarquía de encabezados y regiones de error. Devuelve solo los cambios
necesarios, con la razón técnica de cada uno.
```

### Prompt 5 — Consolidación

```text
Documenta el proyecto para otra persona: README con propósito, stack, cómo
ejecutar, cómo personalizar y créditos. Añade el diario de prompts y las
decisiones técnicas con su alternativa descartada.
```
