from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image
import os

# ---------------- Paleta y tipografias ----------------
AZUL = RGBColor(0x25, 0x63, 0xEB)
AZUL_OSCURO = RGBColor(0x1D, 0x4E, 0xD8)
NARANJA = RGBColor(0xF5, 0x9E, 0x0B)
TINTA = RGBColor(0x0F, 0x17, 0x2A)
GRIS = RGBColor(0x47, 0x55, 0x69)
GRIS_CLARO = RGBColor(0xE2, 0xE8, 0xF0)
FONDO_ALT = RGBColor(0xF8, 0xFA, 0xFC)
BLANCO = RGBColor(0xFF, 0xFF, 0xFF)
VERDE = RGBColor(0x16, 0x65, 0x34)

TITULO_FONT = "Georgia"
CUERPO_FONT = "Segoe UI"

MEDIA = "docs/unidad3/media"
OUT = "docs/unidad3/E34_memoria/presentacion_resumia.pptx"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]

prs.core_properties.title = "ResumIA - Presentacion Unidad 3"
prs.core_properties.author = "Juan Pablo Barrero"
prs.core_properties.subject = "Landing page, persistencia y auditoria"


def caja(slide, l, t, w, h):
    return slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))


def texto(slide, s, l, t, w, h, size=18, bold=False, color=TINTA, font=CUERPO_FONT,
          align=PP_ALIGN.LEFT, spacing=1.0, anchor=MSO_ANCHOR.TOP):
    box = caja(slide, l, t, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = spacing
    run = p.add_run()
    run.text = s
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.name = font
    run.font.color.rgb = color
    return box


def parrafos(slide, items, l, t, w, h, size=18, color=TINTA, gap=10, font=CUERPO_FONT,
             bullet="—", bullet_color=NARANJA, spacing=1.05):
    box = caja(slide, l, t, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(gap)
        p.line_spacing = spacing
        if bullet:
            r1 = p.add_run()
            r1.text = bullet + "  "
            r1.font.size = Pt(size)
            r1.font.bold = True
            r1.font.name = font
            r1.font.color.rgb = bullet_color
        r2 = p.add_run()
        r2.text = item
        r2.font.size = Pt(size)
        r2.font.name = font
        r2.font.color.rgb = color
    return box


def imagen(slide, path, l, t, w, h):
    iw, ih = Image.open(path).size
    r = min(w / iw, h / ih)
    nw, nh = iw * r, ih * r
    left = l + (w - nw) / 2
    top = t + (h - nh) / 2
    slide.shapes.add_picture(path, Inches(left), Inches(top), Inches(nw), Inches(nh))


def fondo(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def tarjeta(slide, l, t, w, h, relleno=BLANCO, borde=GRIS_CLARO):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = relleno
    shape.line.color.rgb = borde
    shape.line.width = Pt(1)
    shape.shadow.inherit = False
    try:
        shape.adjustments[0] = 0.08
    except Exception:
        pass
    return shape


def encabezado(slide, titulo, numero):
    texto(slide, "RESUMIA  ·  UNIDAD 3", 0.7, 0.45, 6, 0.3, size=11, bold=True, color=NARANJA)
    texto(slide, titulo, 0.7, 0.75, 10.6, 1.0, size=30, bold=True, color=TINTA, font=TITULO_FONT)
    barra = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.7), Inches(1.55), Inches(1.3), Inches(0.055))
    barra.fill.solid()
    barra.fill.fore_color.rgb = NARANJA
    barra.line.fill.background()
    texto(slide, numero, 12.1, 0.45, 0.6, 0.4, size=12, bold=True, color=GRIS_CLARO, align=PP_ALIGN.RIGHT)
    # pie
    linea = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.7), Inches(7.06), Inches(11.93), Inches(0.012))
    linea.fill.solid()
    linea.fill.fore_color.rgb = GRIS_CLARO
    linea.line.fill.background()
    texto(slide, "ResumIA  ·  Proyecto final  ·  Juan Pablo Barrero", 0.7, 7.12, 8, 0.3, size=9, color=GRIS)
    texto(slide, str(int(numero) if numero.isdigit() else ""), 12.1, 7.12, 0.6, 0.3, size=9, color=GRIS, align=PP_ALIGN.RIGHT)


def notas(slide, guion):
    slide.notes_slide.notes_text_frame.text = guion


# ================= SLIDE 1 - PORTADA =================
s = prs.slides.add_slide(BLANK)
fondo(s, TINTA)
circulo = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(9.6), Inches(-1.9), Inches(5.6), Inches(5.6))
circulo.fill.solid()
circulo.fill.fore_color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
circulo.line.fill.background()
circulo2 = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(11.1), Inches(1.0), Inches(2.3), Inches(2.3))
circulo2.fill.solid()
circulo2.fill.fore_color.rgb = NARANJA
circulo2.line.fill.background()

barra = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(1.4), Inches(0.07), Inches(4.6))
barra.fill.solid()
barra.fill.fore_color.rgb = NARANJA
barra.line.fill.background()

texto(s, "UNIDAD 3  ·  PROYECTO FINAL", 1.25, 1.45, 8, 0.4, size=13, bold=True, color=NARANJA)
texto(s, "ResumIA", 1.2, 1.95, 9.5, 1.4, size=66, bold=True, color=BLANCO, font=TITULO_FONT)
texto(s, "Landing page + módulo de persistencia", 1.25, 3.35, 9.5, 0.6, size=24, color=RGBColor(0xCB, 0xD5, 0xE1))
texto(s, "Del código generado por IA al código verificado", 1.25, 4.0, 9.5, 0.45, size=16, color=RGBColor(0x94, 0xA3, 0xB8))
texto(s, "Juan Pablo Barrero", 1.25, 5.35, 7, 0.4, size=17, bold=True, color=BLANCO)
texto(s, "Universidad Pedagógica y Tecnológica de Colombia", 1.25, 5.75, 9, 0.35, size=12, color=RGBColor(0xCB, 0xD5, 0xE1))
texto(s, "Tecnología en Programación de Sistemas Informáticos", 1.25, 6.05, 9, 0.35, size=12, color=RGBColor(0xCB, 0xD5, 0xE1))
notas(s, "Buenos días. Soy Juan Pablo Barrero y voy a presentar ResumIA, una landing page para una beta que resume documentos PDF con inteligencia artificial. La entrega de la Unidad 3 no es solo la página: incluye el módulo de persistencia del formulario, una auditoría del código generado por IA, un sistema de componentes y la memoria del proceso. En diez minutos voy a contar qué construí, por qué tomé cada decisión y qué evidencia tengo de que funciona. Empiezo por el problema.")

# ================= SLIDE 2 - PROBLEMA =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "El problema y la propuesta", "02")
parrafos(s, [
    "Público: estudiantes de posgrado, docentes e investigadores.",
    "Dolor: entre 10 y 20 PDFs por semana y poco tiempo para filtrarlos.",
    "Promesa: ideas clave, conclusiones y próximos pasos, sin reemplazar el criterio académico.",
    "Objetivo único de la página: capturar el correo de la beta.",
], 0.7, 1.95, 5.5, 3.8, size=17, gap=14)
texto(s, "El recorrido: promesa → beneficios → prueba social → FAQ → urgencia → formulario.",
      0.7, 5.8, 5.6, 0.7, size=13, bold=True, color=AZUL_OSCURO)
imagen(s, os.path.join(MEDIA, "pres_landing.png"), 6.55, 1.85, 6.1, 4.9)
notas(s, "El producto nace de un problema concreto. Un estudiante de posgrado, un docente o un investigador lee entre diez y veinte PDFs por semana. El problema no es la falta de información: es el costo de filtrarla. ResumIA promete un mapa de navegación: ideas clave, conclusiones y próximos pasos, sin reemplazar el criterio académico. La página está pensada para un solo objetivo: capturar el correo de quien quiere entrar a la beta. Por eso el recorrido va de la promesa a la prueba social, resuelve objeciones con el FAQ, introduce urgencia con el contador y termina en el formulario. La paleta azul transmite confianza, el naranja señala la acción y la tipografía Lora da un tono editorial.")

# ================= SLIDE 3 - ARQUITECTURA =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Arquitectura de la landing", "03")
imagen(s, os.path.join(MEDIA, "pres_arquitectura.png"), 0.7, 1.75, 11.9, 4.35)
# tres tarjetas
for i, (titulo, detalle) in enumerate([
    ("HTML5 + 32 tokens", "Semántica, accesibilidad y CSS mobile-first"),
    ("5 módulos IIFE", "core, persistencia, FAQ, contador, progreso"),
    ("GitHub Pages + Formspree", "Sitio estático y captura sin backend propio"),
]):
    l = 0.7 + i * 4.02
    tarjeta(s, l, 6.22, 3.75, 0.68, FONDO_ALT, GRIS_CLARO)
    texto(s, titulo, l + 0.18, 6.28, 3.45, 0.28, size=12, bold=True, color=TINTA)
    texto(s, detalle, l + 0.18, 6.55, 3.45, 0.28, size=8.5, color=GRIS)
notas(s, "La arquitectura es deliberadamente simple: HTML5 semántico, CSS mobile-first con 32 custom properties y JavaScript ES6 sin frameworks. El comportamiento está separado en cinco módulos que se cargan al final del body, cada uno dentro de una IIFE: core, persistencia, FAQ, contador y progreso de lectura. Esa separación evita variables globales y permite explicar cada archivo en una frase. El sitio se publica en GitHub Pages, que solo sirve archivos estáticos. Por eso el envío del formulario no va a un backend propio: va a un servicio externo, Formspree en producción. En la demo uso httpbin para verificar el POST y la respuesta 200 sin depender de una cuenta.")

# ================= SLIDE 4 - PERSISTENCIA =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Persistencia: datos que sobreviven a la recarga", "04")
parrafos(s, [
    "6 requerimientos con claves resumia_*.",
    "localStorage: sobrevive al cierre, no viaja en cada petición.",
    "input → autoguardado → recarga → restauración.",
    "POST con fetch, AbortController y response.ok.",
    "Limpieza del borrador y marca de usuario convertido.",
], 0.7, 1.95, 4.5, 4.2, size=15.5, gap=12)
imagen(s, os.path.join(MEDIA, "pres_persistencia.png"), 5.35, 1.8, 7.3, 4.7)
notas(s, "El corazón de la entrega es la persistencia. Definí seis requerimientos: nombre, correo, perfil, consentimiento, estado de conversión y fecha de la cohorte. Cada uno tiene una clave con el prefijo resumia_. Elegí localStorage y no cookies ni sessionStorage por tres razones: sobrevive al cierre de la pestaña, no se envía automáticamente en cada petición y no expone datos personales en la red. El flujo es este: el evento input guarda cada campo; al recargar, el borrador se restaura; al enviar, se valida, se hace POST con fetch y AbortController, se comprueba response.ok, se guarda la marca de usuario convertido, se limpian las claves del borrador y se muestra el agradecimiento. En la siguiente visita el formulario ya no aparece.")

# ================= SLIDE 5 - AUDITORIA =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Auditoría del código generado por IA", "05")
texto(s, "14 hallazgos  ·  4 críticos", 0.7, 1.9, 4.6, 0.45, size=19, bold=True, color=NARANJA)
parrafos(s, [
    "XSS por innerHTML con el nombre del usuario.",
    "XHR síncrono que bloquea la interfaz.",
    "document.write que borra el documento y rompe el reset.",
    "PII en console.log: correo y consentimiento.",
    "Ciclo AVIA + protocolo de 12 ítems.",
], 0.7, 2.45, 4.6, 3.6, size=14.5, gap=10)
imagen(s, os.path.join(MEDIA, "pres_console_log.png"), 5.45, 1.85, 7.2, 4.55)
texto(s, "Error real en la línea 83 · fuga de datos en consola", 5.45, 6.45, 7.2, 0.3, size=10, color=GRIS, align=PP_ALIGN.CENTER)
notas(s, "La auditoría fue la parte más incómoda y la más valiosa. Generé la sección en una sesión limpia de AI Studio y la revisé antes de ejecutarla. Encontré catorce hallazgos; cuatro críticos. El saludo usaba innerHTML con el nombre del usuario: un XSS. El envío usaba XMLHttpRequest síncrono: bloqueaba la interfaz. document.write reemplazaba el documento y el reset posterior lanzaba un TypeError. Y un console.log imprimía el correo y el consentimiento. La consola de DevTools lo confirma: fuga de datos, error en la línea 83 y advertencia de formulario desconectado. Apliqué el ciclo AVIA: analizar, verificar, iterar y ajustar el prompt base. La corrección usa textContent, fetch asíncrono y un protocolo de doce ítems: cuatro de seguridad, cuatro de calidad y cuatro de rendimiento.")

# ================= SLIDE 6 - SISTEMA =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Sistema de componentes", "06")
parrafos(s, [
    "16 tokens documentados: color, tipografía, espacio, radios, sombras.",
    "Convención resumia-componente__elemento--estado.",
    "4 snippets con al menos 3 tokens cada uno.",
    "IIFE, clase contenedora única y script al final del body.",
    "Modo oscuro redefiniendo tokens, no componentes.",
], 0.7, 1.95, 4.7, 4.2, size=15, gap=12)
imagen(s, os.path.join(MEDIA, "pres_sistema.png"), 5.5, 1.8, 7.15, 4.7)
notas(s, "Para que la página no creciera sin orden, definí un sistema de componentes. Dieciséis tokens documentados —color, tipografía, espaciado, radios, sombras— y una convención: resumia-componente__elemento--estado. Cada snippet consume al menos tres custom properties, vive en su propia IIFE y se integra con una clase contenedora única. Los cuatro snippets son el hero, el acordeón FAQ, el contador y la barra de progreso con volver arriba. El resultado es que el modo oscuro se obtiene redefiniendo tokens, sin reglas nuevas por componente.")

# ================= SLIDE 7 - RESULTADOS =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Resultados verificables", "07")
stats = [("100", "Accesibilidad"), ("100", "Buenas prácticas"), ("100", "SEO"), ("97–100", "Performance")]
for i, (valor, etiqueta) in enumerate(stats):
    l = 0.7 + i * 3.02
    tarjeta(s, l, 1.85, 2.8, 1.25, FONDO_ALT, GRIS_CLARO)
    texto(s, valor, l, 1.95, 2.8, 0.6, size=34, bold=True, color=AZUL, align=PP_ALIGN.CENTER, font=TITULO_FONT)
    texto(s, etiqueta, l, 2.55, 2.8, 0.35, size=11, color=GRIS, align=PP_ALIGN.CENTER)
imagen(s, os.path.join(MEDIA, "pres_responsive.png"), 0.85, 3.35, 11.6, 2.9)
texto(s, "0 errores en consola  ·  0 respuestas 4xx  ·  W3C sin mensajes  ·  375 / 768 / 1280 px",
      0.7, 6.5, 11.9, 0.35, size=13, bold=True, color=AZUL_OSCURO, align=PP_ALIGN.CENTER)
notas(s, "Los resultados son verificables. Lighthouse, en móvil, da 100 en accesibilidad, buenas prácticas y SEO, y entre 97 y 100 en rendimiento. La consola no tiene errores ni respuestas 4xx, y el validador W3C no reporta mensajes. El formulario cumple las cinco funciones: validación accesible, autoguardado, restauración, envío y estado convertido. La página responde en 375, 768 y 1280 píxeles; las tres capturas están en la memoria. Y todo está publicado en GitHub Pages, con el repositorio y los PDFs enlazados desde el README.")

# ================= SLIDE 8 - APRENDIZAJES =================
s = prs.slides.add_slide(BLANK)
fondo(s, BLANCO)
encabezado(s, "Lo que aprendí", "08")
aprendizajes = [
    ("01", "La IA desplaza el valor", "De escribir código a decidir qué construir y cómo verificarlo."),
    ("02", "Hay competencias no delegables", "Criterio, auditoría y evidencia: lo que sostiene la confianza."),
    ("03", "Los límites son predecibles", "Seguridad, contexto acumulado y verificación: ahí falla el modelo."),
]
for i, (num, titulo, detalle) in enumerate(aprendizajes):
    l = 0.7 + i * 4.05
    tarjeta(s, l, 2.0, 3.85, 3.3, FONDO_ALT, GRIS_CLARO)
    texto(s, num, l + 0.3, 2.2, 1, 0.5, size=20, bold=True, color=NARANJA, font=TITULO_FONT)
    texto(s, titulo, l + 0.3, 2.8, 3.3, 0.8, size=17, bold=True, color=TINTA, font=TITULO_FONT)
    texto(s, detalle, l + 0.3, 3.65, 3.25, 1.4, size=13, color=GRIS)
texto(s, "“El código se genera en segundos; la confianza se construye con evidencia.”",
      0.7, 5.85, 11.9, 0.5, size=18, bold=True, color=AZUL_OSCURO, align=PP_ALIGN.CENTER)
notas(s, "¿Qué aprendí? Que la IA no reemplaza al desarrollador: desplaza el valor del trabajo. Cuando el código se produce en segundos, lo escaso es decidir qué construir, verificarlo y responder por él. Las competencias que no se delegan son el criterio, la auditoría y la evidencia. Gemini fue fuerte en estructura y copy, y débil en seguridad y verificación. Por eso el flujo que voy a repetir tiene dos condiciones: revisión humana en todo lo que toque datos personales y un protocolo escrito antes de generar, no después.")

# ================= SLIDE 9 - CIERRE =================
s = prs.slides.add_slide(BLANK)
fondo(s, TINTA)
texto(s, "Gracias", 0.9, 1.2, 7, 1.2, size=54, bold=True, color=BLANCO, font=TITULO_FONT)
texto(s, "Preguntas y demostración en vivo", 0.95, 2.45, 7, 0.5, size=20, color=RGBColor(0xCB, 0xD5, 0xE1))
barra = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.95), Inches(3.1), Inches(1.2), Inches(0.06))
barra.fill.solid()
barra.fill.fore_color.rgb = NARANJA
barra.line.fill.background()
texto(s, "kanonufo.github.io/landing-page-ia", 0.95, 3.45, 7, 0.45, size=18, bold=True, color=NARANJA)
texto(s, "github.com/kanonufo/landing-page-ia", 0.95, 3.95, 7, 0.4, size=14, color=RGBColor(0x94, 0xA3, 0xB8))
texto(s, "Proyecto académico · UPTC · Unidad 3", 0.95, 6.4, 7, 0.35, size=11, color=RGBColor(0x94, 0xA3, 0xB8))
imagen(s, os.path.join(MEDIA, "pres_qr.png"), 9.2, 1.5, 3.0, 3.0)
texto(s, "Escanea para abrir el sitio", 8.95, 4.65, 3.5, 0.35, size=11, color=RGBColor(0xCB, 0xD5, 0xE1), align=PP_ALIGN.CENTER)
notas(s, "ResumIA está publicado en kanonufo.github.io/landing-page-ia. El repositorio tiene el código, los ocho entregables y las evidencias. El tablero Kanban está vinculado al repositorio. Gracias. Quedo atento a sus preguntas.")

os.makedirs(os.path.dirname(OUT), exist_ok=True)
prs.save(OUT)
print("OK", OUT, os.path.getsize(OUT))
