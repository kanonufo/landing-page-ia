# Guion de la presentación oral — 10 minutos

**Entregable:** E3.4 — Proyecto final y memoria de proceso.
**Soporte:** 8 diapositivas + demo en vivo del formulario.

## Diapositiva 1 — Portada (30 s)

- ResumIA: landing de captura para una beta de resúmenes de PDF con IA.
- Objetivo único: convertir visitas en correos registrados.
- URL publicada y repositorio.

## Diapositiva 2 — Problema y propuesta de valor (1 min)

- Público: estudiantes de posgrado, docentes e investigadores.
- Dolor: decenas de PDFs por semana y poco tiempo para filtrarlos.
- Promesa: ideas clave, conclusiones y próximos pasos sin reemplazar el criterio.
- Traducción al diseño: azul/confianza, naranja/acción, Lora/rigor, Inter/legibilidad.

## Diapositiva 3 — Arquitectura (1 min)

- HTML5 semántico, CSS mobile-first con 32 tokens, JavaScript ES6+ sin frameworks.
- Cinco módulos IIFE al final del body: core, persistencia, FAQ, contador, progreso.
- GitHub Pages como hosting estático; Formspree como captura en producción.

## Diapositiva 4 — Persistencia (1 min 30 s)

- Seis requerimientos y sus claves `resumia_*`.
- Por qué localStorage y no cookies o sessionStorage.
- Flujo: input → autoguardado → recarga → restauración → POST → limpieza → convertido.
- Demo en vivo: escribir, recargar, enviar y mostrar Application.

## Diapositiva 5 — Auditoría (1 min 30 s)

- Código generado en sesión limpia y auditado antes de ejecutar.
- Catorce hallazgos: cuatro críticos (XSS, XHR síncrono, `document.write`, PII).
- Evidencia: TypeError en la línea 83 y consola con fuga de datos.
- Corrección: `textContent`, `fetch`, estado convertido y protocolo de 12 ítems.

## Diapositiva 6 — Sistema de componentes (1 min)

- Tokens, convención `resumia-*` y prompt maestro.
- Cuatro snippets: hero, FAQ, contador, progreso.
- Protocolo: clase contenedora, IIFE, script al final, ≥3 tokens por snippet.

## Diapositiva 7 — Resultados (1 min 30 s)

- Lighthouse: Performance 97–100, Accessibility 100, Best Practices 100, SEO 100.
- Consola sin errores; 0 respuestas 4xx.
- Responsive verificado en 375, 768 y 1280 px.
- Formulario: 5/5 funciones verificadas.

## Diapositiva 8 — Aprendizajes (1 min 30 s)

- La IA desplaza el valor: de escribir a decidir y verificar.
- Competencias no delegables: criterio, auditoría, evidencia.
- Límites encontrados: contexto acumulado, seguridad, verificación.
- Condiciones para volver a usar el flujo: revisión humana en datos personales y protocolo escrito antes de generar.

## Cierre (30 s)

- El producto está publicado; el proceso es auditable; la decisión final sigue siendo humana.
- Invitación a revisar el repositorio y la memoria.

## Preguntas previsibles

- ¿Por qué httpbin y no Formspree en la demo? Porque permite verificar el POST sin una cuenta; el cambio es una línea en `data-endpoint`.
- ¿Qué pasa en modo privado? El formulario funciona; solo se pierde la persistencia entre recargas.
- ¿Por qué no hay backend? El objetivo es una landing estática; Formspree cubre la captura sin servidor propio.
- ¿Cómo se evita el XSS? `textContent`, validación y prohibición de `innerHTML` con datos de usuario.
