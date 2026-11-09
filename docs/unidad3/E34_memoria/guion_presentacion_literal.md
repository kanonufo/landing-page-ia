<div class="portada"><img src="../media/portada_e34.svg" alt="Portada del entregable E3.4"></div>

# Guion literal de la presentación — 10 minutos

**Archivo para proyectar:** `presentacion_resumia.pptx` (14 diapositivas, 16:9).

**Cómo usarlo:** abre el PPTX en PowerPoint y entra en **Presentación → Vista Moderador**. Las notas de cada diapositiva contienen exactamente el texto de este documento.

**Duración objetivo:** 10 minutos 10 segundos, con margen para preguntas.

## Diapositiva 1 — Portada (0:00–0:30)

**Di exactamente:**

> Buenos días. Soy Juan Pablo Barrero y voy a presentar ResumIA, una landing page para una beta que resume documentos PDF con inteligencia artificial. La entrega de la Unidad 3 no es solo la página: incluye el módulo de persistencia del formulario, una auditoría del código generado por IA, un sistema de componentes y la memoria del proceso. Voy a contar qué construí, por qué tomé cada decisión y qué evidencia tengo de que funciona. Empiezo por el problema.

## Diapositiva 2 — El problema (0:30–1:15)

**Di exactamente:**

> El producto nace de un problema concreto. Un estudiante de posgrado, un docente o un investigador lee entre diez y veinte PDFs por semana. El problema no es la falta de información: es el costo de filtrarla. Antes de leer en profundidad hay que decidir qué merece la pena, y esa decisión consume tiempo y energía. ResumIA ataca justo esa primera capa: no reemplaza la lectura académica, la organiza.

## Diapositiva 3 — La propuesta de valor (1:15–2:00)

**Di exactamente:**

> La promesa es un mapa de navegación: ideas clave, conclusiones y próximos pasos, sin reemplazar el criterio académico. La página está pensada para un solo objetivo: capturar el correo de quien quiere entrar a la beta. Por eso el recorrido va de la promesa a la prueba social, resuelve objeciones con el FAQ, introduce urgencia con el contador y termina en el formulario. La paleta azul transmite confianza, el naranja señala la acción y la tipografía Lora da un tono editorial. Los tres beneficios —tiempo, rigor y privacidad— responden a las tres objeciones que aparecieron en la investigación.

## Diapositiva 4 — Arquitectura de la landing (2:00–2:50)

**Di exactamente:**

> La arquitectura es deliberadamente simple: HTML5 semántico, CSS mobile-first con 32 custom properties y JavaScript ES6 sin frameworks. El comportamiento está separado en cinco módulos que se cargan al final del body, cada uno dentro de una IIFE: core, persistencia, FAQ, contador y progreso de lectura. Esa separación evita variables globales y permite explicar cada archivo en una frase. El sitio se publica en GitHub Pages, que solo sirve archivos estáticos. Por eso el envío del formulario no va a un backend propio: va a un servicio externo, Formspree en producción. En la demo uso httpbin para verificar el POST y la respuesta 200 sin depender de una cuenta.

## Diapositiva 5 — Persistencia: seis requerimientos (2:50–3:40)

**Di exactamente:**

> Definí seis requerimientos de persistencia. El nombre evita reescribir si el visitante abandona y vuelve. El correo es el lead: perderlo es perder la conversión. El perfil segmenta la beta. El consentimiento conserva la decisión del usuario entre recargas, para no confundir “no aceptó” con “nunca se le preguntó”. El estado de conversión evita repetir el formulario a quien ya se registró. Y la fecha de la cohorte mantiene la urgencia sin reiniciarse en cada visita. Cada uno usa una clave con el prefijo resumia_. Elegí localStorage y no cookies ni sessionStorage por tres razones: sobrevive al cierre de la pestaña, no se envía automáticamente en cada petición y no expone datos personales en la red.

## Diapositiva 6 — Persistencia: el flujo completo (3:40–4:25)

**Di exactamente:**

> El flujo es este: el evento input guarda cada campo; al recargar, el borrador se restaura; al enviar, se valida, se hace POST con fetch y AbortController, se comprueba response.ok, se guarda la marca de usuario convertido, se limpian las claves del borrador y se muestra el agradecimiento. En la siguiente visita el formulario ya no aparece. La limpieza es importante: no dejamos datos personales en el navegador después de la conversión.

## Diapositiva 7 — Auditoría: catorce hallazgos (4:25–5:10)

**Di exactamente:**

> La auditoría fue la parte más incómoda y la más valiosa. Generé la sección en una sesión limpia de AI Studio y la revisé antes de ejecutarla. Encontré catorce hallazgos; cuatro críticos. El saludo usaba innerHTML con el nombre del usuario: un XSS. El envío usaba XMLHttpRequest síncrono: bloqueaba la interfaz. document.write reemplazaba el documento y el reset posterior lanzaba un TypeError. Y un console.log imprimía el correo y el consentimiento. La consola de DevTools lo confirma: fuga de datos, error en la línea 83 y advertencia de formulario desconectado.

## Diapositiva 8 — Auditoría: las correcciones (5:10–5:55)

**Di exactamente:**

> Apliqué el ciclo AVIA: analizar, verificar, iterar y ajustar el prompt base. En analizar inventarié el código antes de ejecutarlo; en verificar usé la consola real; en iterar corregí con prompts y cambios manuales; en ajustar reescribí el prompt base con restricciones de seguridad. La corrección reemplazó innerHTML por textContent, el XHR síncrono por fetch asíncrono con AbortController y document.write por un bloque de éxito que ya existe en el DOM. Además definí un protocolo de doce ítems: cuatro de seguridad, cuatro de calidad y cuatro de rendimiento.

## Diapositiva 9 — Sistema de componentes (5:55–6:40)

**Di exactamente:**

> Para que la página no creciera sin orden, definí un sistema de componentes. Dieciséis tokens documentados —color, tipografía, espaciado, radios, sombras— y una convención: resumia-componente__elemento--estado. Cada snippet consume al menos tres custom properties, vive en su propia IIFE y se integra con una clase contenedora única. El modo oscuro se obtiene redefiniendo tokens, sin reglas nuevas por componente.

## Diapositiva 10 — Los cuatro snippets (6:40–7:25)

**Di exactamente:**

> Los cuatro snippets son el hero, el acordeón FAQ, el contador y la barra de progreso con volver arriba. Cada uno consume cinco tokens, vive en su propia IIFE y se integra con una clase contenedora única. El protocolo exige al menos tres custom properties por snippet, script al final del body y ninguna variable global. El sistema no es una colección de archivos: es un contrato que permite evaluar cualquier componente nuevo sin discutir gustos.

## Diapositiva 11 — Resultados verificables (7:25–8:10)

**Di exactamente:**

> Los resultados son verificables. Lighthouse, en móvil, da 100 en accesibilidad, buenas prácticas y SEO, y entre 97 y 100 en rendimiento. La consola no tiene errores ni respuestas 4xx, y el validador W3C no reporta mensajes. La página responde en 375, 768 y 1280 píxeles. Y todo está publicado en GitHub Pages.

## Diapositiva 12 — Evidencia de la persistencia (8:10–8:55)

**Di exactamente:**

> Estas son las dos capturas que usa el informe. A la izquierda, el panel Application muestra las claves resumia_form_ con el borrador. A la derecha, el panel Network registra el POST con estado 200 y la respuesta del servicio externo. Después del envío, las claves del borrador desaparecen y quedan solo la marca de usuario convertido y el nombre. Esa es la prueba de que la limpieza ocurre de verdad.

## Diapositiva 13 — Lo que aprendí (8:55–9:40)

**Di exactamente:**

> ¿Qué aprendí? Que la IA no reemplaza al desarrollador: desplaza el valor del trabajo. Cuando el código se produce en segundos, lo escaso es decidir qué construir, verificarlo y responder por él. Las competencias que no se delegan son el criterio, la auditoría y la evidencia. Gemini fue fuerte en estructura y copy, y débil en seguridad y verificación. Por eso el flujo que voy a repetir tiene dos condiciones: revisión humana en todo lo que toque datos personales y un protocolo escrito antes de generar, no después.

## Diapositiva 14 — Cierre (9:40–10:10)

**Di exactamente:**

> ResumIA está publicado en kanonufo.github.io/landing-page-ia. El repositorio tiene el código, los ocho entregables y las evidencias. El tablero Kanban está vinculado al repositorio. Gracias. Quedo atento a sus preguntas.

## Antes de presentar

1. Abre el sitio publicado y comprueba que carga: <https://kanonufo.github.io/landing-page-ia/>.

2. Ten a mano la demo por si falla internet: `docs/unidad3/E32_persistencia/demo_persistencia.mp4`.

3. Abre el PPTX en **Presentación → Vista Moderador** para ver las notas mientras proyectas.

4. Si el tiempo se acorta, omite la diapositiva 10 (snippets) y conserva 5, 7 y 11.

5. Si preguntan por el backend: no hay backend propio; Formspree recibe el POST y GitHub Pages sirve el sitio estático.

## Preguntas previsibles y respuestas breves

- **¿Por qué httpbin y no Formspree en la demo?** Porque permite verificar el POST y el 200 sin una cuenta; el cambio es una línea en `data-endpoint`.

- **¿Qué pasa en modo privado?** El formulario funciona; solo se pierde la persistencia entre recargas.

- **¿Cómo se evita el XSS?** `textContent`, validación y prohibición de `innerHTML` con datos de usuario.

- **¿Por qué no cookies?** Se envían en cada petición y añaden exposición de datos personales innecesaria.

- **¿Qué fue lo más difícil?** La auditoría: distinguir entre “funciona” y “es correcto”.
