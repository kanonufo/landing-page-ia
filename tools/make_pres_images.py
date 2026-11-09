from PIL import Image, ImageDraw, ImageFont
import qrcode
import os

MEDIA = "docs/unidad3/media"
CAP = "docs/unidad3/capturas"

# 1) Lighthouse: recorte de la zona de puntajes y metricas
img = Image.open(os.path.join(CAP, "lighthouse_report.png"))
img.crop((0, 0, img.width, 900)).save(os.path.join(MEDIA, "pres_lighthouse.png"))

# 2) Landing: vista de escritorio
landing = Image.open(os.path.join(CAP, "readme_preview.png")).convert("RGB")
landing.save(os.path.join(MEDIA, "pres_landing.png"))

# 3) Consola real del codigo original
console = Image.open(os.path.join(CAP, "devtools_consola_original.png")).convert("RGB")
console.save(os.path.join(MEDIA, "pres_console.png"))

# 4) Composicion responsive (375 / 768 / 1280)
def recorte(path, alto):
    im = Image.open(path).convert("RGB")
    return im.crop((0, 0, im.width, min(alto, im.height)))

movil = recorte(os.path.join(CAP, "movil_375px.png"), 812)
tablet = recorte(os.path.join(CAP, "tablet_768px.png"), 1024)
desktop = recorte(os.path.join(CAP, "desktop_1280px.png"), 900)

ALTO = 560
def escalar(im):
    w = int(im.width * ALTO / im.height)
    return im.resize((w, ALTO), Image.LANCZOS)

movil, tablet, desktop = escalar(movil), escalar(tablet), escalar(desktop)
gap = 40
ancho = movil.width + tablet.width + desktop.width + gap * 2 + 80
lienzo = Image.new("RGB", (ancho, ALTO + 120), "#f8fafc")
dibujo = ImageDraw.Draw(lienzo)
fuente = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 26)
x = 40
for im, etiqueta in [(movil, "375 px"), (tablet, "768 px"), (desktop, "1280 px")]:
    lienzo.paste(im, (x, 40))
    dibujo.text((x, ALTO + 58), etiqueta, fill="#0f172a", font=fuente)
    x += im.width + gap
lienzo.save(os.path.join(MEDIA, "pres_responsive.png"))

# 5) QR del sitio publicado
qr = qrcode.make("https://kanonufo.github.io/landing-page-ia/")
qr = qr.resize((700, 700), Image.LANCZOS)
qr.save(os.path.join(MEDIA, "pres_qr.png"))

print("imagenes de presentacion listas")
