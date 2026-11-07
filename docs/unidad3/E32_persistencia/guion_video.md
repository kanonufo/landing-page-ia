# Guion del video de demostración — E3.2

**Archivo:** `demo_persistencia.mp4`
**Duración:** 2 min 18 s (138 s)
**Formato:** 1920 × 1080, H.264, subtítulos en español quemados.
**Repositorio:** <https://github.com/kanonufo/landing-page-ia>

## Preparación previa a la grabación

1. Servir el sitio en local: `python -m http.server 8788` y abrir `http://127.0.0.1:8788/index.html`.
2. Abrir DevTools y fijar el panel **Application → Local Storage → http://127.0.0.1:8788**.
3. Limpiar el almacenamiento para partir de cero.
4. Grabar la ventana con Chrome y DevTools acoplado a la derecha.

## Secuencia y marcas de tiempo

| Tiempo | Acción | Qué debe verse |
|---|---|---|
| 0:00–0:04 | Tarjeta de entrada | "ResumIA — Demostración del módulo de persistencia (E3.2)". |
| 0:04–0:28 | Recorrido por la landing | Hero, beneficios, cómo funciona, testimonios, FAQ, contador. El panel Application permanece visible. |
| 0:28–0:64 | Autoguardado | Se escribe el nombre, el correo, se elige el perfil y se marca el consentimiento. En Application aparecen `resumia_form_nombre`, `resumia_form_email`, `resumia_form_rol` y `resumia_form_consentimiento`. |
| 1:04–1:19 | Recarga y restauración | Se recarga la página. Los cuatro campos vuelven con sus valores y aparece el aviso "Recuperamos el borrador…". |
| 1:19–1:32 | Envío externo | Se pulsa "Quiero mi acceso". La petición se completa y se muestra el mensaje de agradecimiento. |
| 1:32–1:45 | Limpieza | En Application se observa que las claves `resumia_form_*` desaparecen; quedan `resumia_usuario_convertido`, `resumia_usuario_nombre` y la fecha del contador. |
| 1:45-2:05 | Usuario convertido | Se recarga. El formulario no aparece; se muestra "Gracias, Elena Vázquez. Tu acceso está reservado.". |
| 2:05-2:12 | Respuesta del servicio | El panel Network muestra el `POST` con estado 200 y la respuesta del servicio externo. |
| 2:12–2:18 | Tarjeta de cierre | Cuatro logros verificados y la URL del repositorio. |

## Subtítulos

Los subtítulos están incluidos en `demo_persistencia.srt` y se quemaron en el video. Texto por fase:

1. "Recorrido por la landing page publicada".
2. "Cada campo se guarda en localStorage mientras se escribe".
3. "Al recargar, el borrador se restaura automáticamente".
4. "El formulario se envía al servicio externo y se confirma".
5. "El borrador se limpia y el usuario queda marcado como convertido".
6. "En la siguiente visita se muestra el agradecimiento personalizado".
7. "El POST llega al servicio externo y responde 200".

## Nota de producción

El envío se realizó contra `https://httpbin.org/post`, un servicio HTTP real que devuelve el cuerpo recibido. Para producción, el atributo `data-endpoint` del formulario se sustituye por el endpoint de Formspree (`https://formspree.io/f/TU_ID`); el resto del flujo no cambia.
