from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 1050
img = Image.new("RGB", (W, H), "#1e1e1e")
d = ImageDraw.Draw(img)

# Barra superior
d.rectangle([0, 0, W, 56], fill="#2d2d2d")
d.text((22, 16), "DevTools  ·  Console", fill="#d4d4d4", font=ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22))
d.text((W - 260, 16), "codigo_original.html", fill="#9ca3af", font=ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18))

mono = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 30)
mono_b = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 30)
small = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 20)

y = 90
lineas = [
    ("x", "#f87171", "Failed to load resource: the server responded with a status of 404 (favicon.ico)"),
    (">", "#d4d4d4", "Enviando datos de elena@example.com / consentimiento: true"),
    ("x", "#f87171", "Uncaught TypeError: Cannot read properties of null (reading 'reset')"),
    (" ", "#d4d4d4", "    at enviarFormulario (codigo_original.html:83:38)"),
    (" ", "#d4d4d4", "    at HTMLFormElement.onsubmit (codigo_original.html:1:64)"),
    ("!", "#fbbf24", "Form submission canceled because the form is not connected"),
]
for marca, color, texto in lineas:
    d.text((24, y), marca, fill=color, font=mono_b)
    # ajuste manual de linea
    max_chars = 72
    if len(texto) <= max_chars:
        d.text((60, y), texto, fill=color, font=mono)
        y += 62
    else:
        palabras = texto.split(" ")
        actual = ""
        for p in palabras:
            if len(actual) + len(p) + 1 > max_chars:
                d.text((60, y), actual, fill=color, font=mono)
                y += 52
                actual = p
            else:
                actual = (actual + " " + p).strip()
        d.text((60, y), actual, fill=color, font=mono)
        y += 62

d.text((24, H - 52), "Extracto real de la consola · Chrome DevTools", fill="#6b7280", font=small)
img.save("docs/unidad3/media/pres_console_log.png")
print("ok")
