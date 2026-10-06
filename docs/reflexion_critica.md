# Reflexión crítica — ResumIA (Unidad 2)

**Proyecto:** Landing page ResumIA · **Estudiante:** Juan Pablo Barrero · **Herramienta:** Google AI Studio (Gemini)

## 1. Descripción del proceso

Desarrollar esta landing page con Gemini fue como trabajar con un copiloto que nunca se cansa, pero al que hay que revisar todo. Empecé por la planificación (paleta, tipografías y buyer persona), seguí por el copy completo y la estructura HTML, después el estilizado CSS con las secciones nuevas, y terminé con JavaScript: validación del formulario, animaciones de aparición, cambio de la cabecera al hacer scroll y modo oscuro. Cerré con la validación W3C, la publicación en GitHub Pages y la documentación del proceso. Los prompts más rentables fueron los que pedían piezas completas: en una sola respuesta obtuve tres titulares, cinco beneficios, tres variaciones de CTA y dos testimonios; las funciones de Intersection Observer y de tema oscuro llegaron casi listas para integrar. Frente a escribir cada línea a mano, el ahorro fue de horas de trabajo, sobre todo en el copy y en el CSS repetitivo.

## 2. Limitaciones encontradas

La IA falló en varios momentos concretos. El primer chat de planificación no quedó guardado en AI Studio y tuve que re-ejecutar los prompts P1 y P2 para conseguir las capturas de evidencia. En el refactor de JavaScript (P11) olvidé adjuntar el archivo y Gemini inventó un script con IDs falsos (`#formulario-beta`), `innerHTML` con `onclick` y sin mensajes por campo: era imposible de aplicar. Al proponer la cabecera sugirió `position: fixed`, que habría tapado el contenido y roto los enlaces ancla. En las tarjetas usó un selector inexistente (`.icono`) y columnas de ancho desigual, y el validador W3C marcó avisos por un `role="list"` redundante. La lección fue clara: nunca integrar una salida sin revisarla. Resolví comparando cada respuesta con mi HTML real, adaptando selectores, manteniendo `sticky` junto con `scroll-margin-top`, verificando contrastes por cálculo y probando el formulario, las animaciones y el tema con pruebas funcionales en el navegador.

## 3. Aprendizaje en prompting

Aprendí que un prompt efectivo para desarrollo web necesita rol, contexto, restricciones y formato. Cuando especifiqué "solo CSS, sin tocar el HTML", "sin var, sin alert, con comentarios" o "máximo 2 familias tipográficas", las respuestas fueron directamente utilizables; cuando faltaron detalles, llegó código genérico o incompleto. Adjuntar el archivo real marcó la diferencia entre un refactor correcto y una invención. También funcionaron muy bien las iteraciones con criterios de rechazo explícitos ("los testimonios suenan genéricos, exige una cifra concreta") y los prompts de depuración con el comportamiento observado, el contexto y el resultado esperado.

## 4. Calidad del resultado

Estoy satisfecho con la landing final: Lighthouse dio 88 en Performance y 100 en Accesibilidad y SEO, el HTML valida sin errores ni advertencias, y el diseño por tarjetas con modo oscuro, animaciones y microinteracciones se siente profesional. Si tuviera más tiempo, optimizaría la carga de las fuentes para acercar Performance a 95+, añadiría un menú hamburguesa accesible en móvil y un contador animado de estadísticas, y probaría la página en más dispositivos y navegadores reales.

## 5. Aplicación futura

Incorporaré la IA generativa como copiloto en mi flujo de trabajo profesional: prototipar componentes, redactar y refinar copy, revisar accesibilidad y documentar los prompts como parte del proceso, igual que hice en este proyecto. La clave que me llevo es verificar siempre: medir contraste, validar el HTML, probar en el navegador y ajustar el resultado con criterio propio. La IA acelera el trabajo, pero la responsabilidad técnica sigue siendo mía.
