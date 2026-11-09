import io

src = "docs/unidad3/E31_auditoria/codigo_corregido.html"
dst = "docs/unidad3/E32_persistencia/persistencia.html"

s = io.open(src, encoding="utf-8").read()
s = s.replace("<title>ResumIA - Registro (código corregido)</title>",
              "<title>ResumIA - Módulo de persistencia (E3.2)</title>")
s = s.replace("<h1>Consigue tu acceso anticipado</h1>",
              '<h1>Módulo de persistencia</h1>\n    <p style="margin-top:-0.5rem;color:#475569">Autoguardado, restauración, envío externo y usuario convertido · E3.2</p>')
io.open(dst, "w", encoding="utf-8", newline="\n").write(s)
print("ok", dst)
