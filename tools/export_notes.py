from pptx import Presentation
import io

PPTX = "docs/unidad3/E34_memoria/presentacion_resumia.pptx"
MD = "docs/unidad3/E34_memoria/guion_presentacion_literal.md"

titulos = [
    "Portada",
    "El problema",
    "La propuesta de valor",
    "Arquitectura de la landing",
    "Persistencia: seis requerimientos",
    "Persistencia: el flujo completo",
    "Auditoría: catorce hallazgos",
    "Auditoría: las correcciones",
    "Sistema de componentes",
    "Los cuatro snippets",
    "Resultados verificables",
    "Evidencia de la persistencia",
    "Lo que aprendí",
    "Cierre",
]

tiempos = [
    "0:00–0:30",
    "0:30–1:15",
    "1:15–2:00",
    "2:00–2:50",
    "2:50–3:40",
    "3:40–4:25",
    "4:25–5:10",
    "5:10–5:55",
    "5:55–6:40",
    "6:40–7:25",
    "7:25–8:10",
    "8:10–8:55",
    "8:55–9:40",
    "9:40–10:10",
]

prs = Presentation(PPTX)
assert len(prs.slides) == len(titulos), (len(prs.slides), len(titulos))

partes = []
partes.append('<div class="portada"><img src="../media/portada_e34.svg" alt="Portada del entregable E3.4"></div>\n')
partes.append("# Guion literal de la presentación — 10 minutos\n")
partes.append("**Archivo para proyectar:** `presentacion_resumia.pptx` (14 diapositivas, 16:9).\n")
partes.append("**Cómo usarlo:** abre el PPTX en PowerPoint y entra en **Presentación → Vista Moderador**. Las notas de cada diapositiva contienen exactamente el texto de este documento.\n")
partes.append("**Duración objetivo:** 10 minutos 10 segundos, con margen para preguntas.\n")

for i, slide in enumerate(prs.slides):
    notas = slide.notes_slide.notes_text_frame.text.strip()
    partes.append(f"## Diapositiva {i + 1} — {titulos[i]} ({tiempos[i]})\n")
    partes.append("**Di exactamente:**\n")
    partes.append("> " + notas.replace("\n", " ") + "\n")

partes.append("## Antes de presentar\n")
partes.append("1. Abre el sitio publicado y comprueba que carga: <https://kanonufo.github.io/landing-page-ia/>.\n")
partes.append("2. Ten a mano la demo por si falla internet: `docs/unidad3/E32_persistencia/demo_persistencia.mp4`.\n")
partes.append("3. Abre el PPTX en **Presentación → Vista Moderador** para ver las notas mientras proyectas.\n")
partes.append("4. Si el tiempo se acorta, omite la diapositiva 10 (snippets) y conserva 5, 7 y 11.\n")
partes.append("5. Si preguntan por el backend: no hay backend propio; Formspree recibe el POST y GitHub Pages sirve el sitio estático.\n")

partes.append("## Preguntas previsibles y respuestas breves\n")
partes.append("- **¿Por qué httpbin y no Formspree en la demo?** Porque permite verificar el POST y el 200 sin una cuenta; el cambio es una línea en `data-endpoint`.\n")
partes.append("- **¿Qué pasa en modo privado?** El formulario funciona; solo se pierde la persistencia entre recargas.\n")
partes.append("- **¿Cómo se evita el XSS?** `textContent`, validación y prohibición de `innerHTML` con datos de usuario.\n")
partes.append("- **¿Por qué no cookies?** Se envían en cada petición y añaden exposición de datos personales innecesaria.\n")
partes.append("- **¿Qué fue lo más difícil?** La auditoría: distinguir entre “funciona” y “es correcto”.\n")

io.open(MD, "w", encoding="utf-8", newline="\n").write("\n".join(partes))
print("OK", MD, len(prs.slides), "diapositivas")
