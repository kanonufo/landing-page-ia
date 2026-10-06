# Reflexión crítica — ResumIA (Unidad 2)

**Proyecto:** Landing page ResumIA · **Estudiante:** Juan Pablo Barrero · **Herramienta:** Google AI Studio (Gemini)

## 1. Cómo fue el proceso

La verdad, al principio trabajar con Gemini fue raro, pero después le cogí el ritmo. Empecé pidiendo la parte creativa (colores, tipografías y el buyer persona), seguí con el copy completo y la estructura HTML, después el CSS con las secciones nuevas y al final el JavaScript: validación del formulario, animaciones, la cabecera con scroll y el modo oscuro. Lo que más me sirvió fue pedir piezas completas de una sola vez: en un solo prompt me dio tres titulares, cinco beneficios, tres CTA y dos testimonios. Eso, escribiéndolo yo a mano, me habría tomado horas. El copy y el CSS repetitivo fueron donde más tiempo ahorré.

## 2. Dónde falló la IA

Tuve varios problemas reales. El primer chat de planificación no se guardó en AI Studio y me tocó repetir los prompts P1 y P2 solo para conseguir las capturas. En el refactor de JavaScript se me olvidó adjuntar el archivo y Gemini me devolvió un script inventado, con IDs que no existían (#formulario-beta) y hasta un onclick; eso no servía para nada. También me propuso position: fixed para la cabecera, que habría tapado el contenido y dañado los enlaces ancla; en las tarjetas usó un selector que no existía y columnas desiguales, y el validador W3C me marcó avisos por un role="list" que sobraba. Aprendí que no se puede confiar a ciegas: revisé cada respuesta contra mi HTML, adapté los selectores, dejé la cabecera con sticky y scroll-margin-top, verifiqué los contrastes con cálculo y probé el formulario, las animaciones y el tema en el navegador.

## 3. Lo que aprendí de prompting

Aprendí que un buen prompt necesita rol, contexto, restricciones y formato. Cuando ponía cosas como "solo CSS, sin tocar el HTML", "sin var ni alert" o "máximo 2 tipografías", la respuesta salía lista para usar; cuando me faltaban detalles, salía código genérico. Adjuntar el archivo real fue la diferencia entre un refactor bueno y uno inventado. También me funcionó pedir iteraciones con criterios claros, por ejemplo "los testimonios suenan genéricos, ponles una cifra concreta", y los prompts de depuración contando qué pasa y qué debería pasar.

## 4. Qué tan satisfecho estoy

Quedé contento con cómo quedó. Lighthouse me dio 88 en rendimiento y 100 en accesibilidad y SEO, el HTML valida sin errores ni advertencias, y el diseño por tarjetas con modo oscuro, animaciones y microinteracciones se ve bien. Si tuviera más tiempo, mejoraría la carga de las fuentes para subir el rendimiento, pondría un menú hamburguesa en móvil y un contador animado, y lo probaría en más celulares y navegadores.

## 5. Cómo lo usaría en mi trabajo

La usaría como copiloto: para armar prototipos rápido, escribir y pulir textos, revisar accesibilidad y dejar documentados los prompts, igual que en este proyecto. Pero siempre verificando: medir contrastes, validar el HTML, probar en el navegador y ajustar con criterio propio. La IA acelera mucho, pero la responsabilidad de lo que se entrega sigue siendo mía.
