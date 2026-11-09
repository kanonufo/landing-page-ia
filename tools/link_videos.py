import io

VIDEO = "https://kanonufo.github.io/landing-page-ia/docs/unidad3/E32_persistencia/demo_persistencia.mp4"
BLOB = "https://github.com/kanonufo/landing-page-ia/blob/master/docs/unidad3/E32_persistencia/demo_persistencia.mp4"

# 1) Documento de diseno E3.2
p = "docs/unidad3/E32_persistencia/diseno_persistencia.md"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "**Demostración:** `demo_persistencia.mp4` (2 min 18 s).",
    "**Demostración:** [`demo_persistencia.mp4`](%s) (2 min 18 s).\n**Código funcional:** `persistencia.html`." % VIDEO,
)
s = s.replace(
    "El archivo `demo_persistencia.mp4` dura 2 min 18 s e incluye subtítulos en español.",
    "El archivo [`demo_persistencia.mp4`](%s) dura 2 min 18 s e incluye subtítulos en español. También está en el repositorio: <%s>." % (VIDEO, BLOB),
)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 2) README
p = "README.md"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "- **E3.2:** [`diseno_persistencia.pdf`](docs/unidad3/E32_persistencia/diseno_persistencia.pdf) · [`demo_persistencia.mp4`](docs/unidad3/E32_persistencia/demo_persistencia.mp4) · [`guion_video.pdf`](docs/unidad3/E32_persistencia/guion_video.pdf)",
    "- **E3.2:** [`diseno_persistencia.pdf`](docs/unidad3/E32_persistencia/diseno_persistencia.pdf) · [`persistencia.html`](docs/unidad3/E32_persistencia/persistencia.html) · [video de demostración](%s) · [`guion_video.pdf`](docs/unidad3/E32_persistencia/guion_video.pdf)" % VIDEO,
)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 3) LEEME
p = "docs/unidad3/LEEME_ENTREGA.md"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "| E3.2 | `E32_persistencia/diseno_persistencia.pdf` + `demo_persistencia.mp4` | Listo. Video de 2 min 18 s con subtítulos y evidencias de DevTools. |",
    "| E3.2 | `E32_persistencia/diseno_persistencia.pdf` + `persistencia.html` + [video](%s) | Listo. Video de 2 min 18 s con subtítulos y evidencias de DevTools. |" % VIDEO,
)
s = s.replace(
    "3. **Formspree en producción (opcional).**",
    "3. **Video E3.2 ya publicado:** <%s>.\n4. **Formspree en producción (opcional).**" % VIDEO,
)
s = s.replace(
    "4. **Video.** Está generado y subtitulado.",
    "5. **Video.** Está generado y subtitulado.",
)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 4) Indice de videos
videos = """# Videos de la Unidad 3

## E3.2 — Demostración del módulo de persistencia (2:18)

- **GitHub Pages (recomendado):** <%s>
- **Repositorio (blob):** <%s>
- **Archivo local:** `E32_persistencia/demo_persistencia.mp4`

## E3.4 — Presentación grabada (11:21)

- **YouTube (No listado):** <https://youtu.be/RWPANQKzXgY>
- **Diapositivas:** `E34_memoria/presentacion_resumia.pptx`
- **PDF de respaldo:** `E34_memoria/presentacion_resumia.pdf`
- **Guion literal:** `E34_memoria/guion_presentacion_literal.pdf`
""" % (VIDEO, BLOB)
io.open("docs/unidad3/VIDEOS.md", "w", encoding="utf-8", newline="\n").write(videos)

print("ok")
