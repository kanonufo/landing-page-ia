# Planificación — Proyecto Unidad 2 (ResumIA)

Documento de trabajo de la **Fase 1** del Proyecto Integrador "Mi Primera
Landing Page Profesional con IA". Estado: **borrador** — se completa con las
respuestas de Google AI Studio (Prompts P1 y P2) y con el boceto.

---

## 1. Producto o servicio (descripción en 5 líneas)

ResumIA es una startup ficticia cuyo producto es un asistente de IA que
convierte documentos PDF en resúmenes claros: ideas clave, conclusiones y
próximos pasos. Está dirigido a estudiantes, docentes y profesionales que
procesan mucho material académico o informes extensos. La propuesta de valor es
"convierte cualquier PDF en un resumen claro en segundos". Su categoría es
**producto digital (SaaS)** y su objetivo único es capturar correos para el
acceso anticipado (beta). *(Pendiente: validar redacción con la salida de AI Studio.)*

## 2. Buyer persona

Respuesta seleccionada de Google AI Studio (Prompt P2, ejecución con evidencia;
la primera ejecución no quedó guardada en AI Studio y el prompt se repitió):

| Campo | Valor |
|---|---|
| Nombre ficticio | Elena Vázquez |
| Edad | 28 años |
| Ocupación | Estudiante de doctorado en Ciencias Sociales |
| Dolor principal | "Siento que paso más tiempo intentando digerir montañas de PDFs que realmente analizando o escribiendo mis conclusiones". |
| Deseo principal | Identificar los argumentos críticos de un texto en minutos para decidir si merece una lectura profunda. |
| Objeción más común | "Me da miedo que la IA simplifique demasiado el contenido y pierda los matices teóricos esenciales." → Se desmonta con: "ResumIA no reemplaza tu lectura, sino que actúa como un mapa de navegación que resalta las ideas clave para que tú decidas qué profundizar con tu criterio académico." |

Motivación principal: recuperar el control sobre su tiempo de investigación,
delegando la tarea mecánica de procesamiento a la IA para centrar su energía
intelectual en la síntesis y la creación de conocimiento nuevo.

Implicaciones para el copy (Fase 2): la respuesta a la objeción ("no reemplaza tu
lectura, es un mapa") se usará como microcopy en la sección "¿Cómo funciona?";
el hero mantiene "Sin tarjeta de crédito · Cancela cuando quieras" y se añadirá
bajo el CTA el microcopy anti-fricción sugerido en P3.

## 3. Secciones de la landing (7 obligatorias + 1 libre)

| N | Sección | Contenido específico de ResumIA | Estado |
|---|---|---|---|
| 1 | Header | Logo ResumIA + menú de anclas (Beneficios · Cómo funciona · Testimonios) + CTA secundario "Acceso anticipado" | Integrado |
| 2 | Hero | H1 final (P5): "Resume PDFs complejos en minutos, no horas" + subtítulo de P3 + CTA "Reservar mi lugar ahora" + microcopy anti-fricción | Integrado |
| 3 | Beneficios | 5 beneficios integrados (Acelera tu ritmo · Extrae rigor académico · Protege tu investigación · Filtra tu bibliografía · Optimiza tu flujo) | Integrado (P3+P5) |
| 4 | Testimonios (prueba social) | Testimonios recomendados en P4 (Valentina R., posgrado/Madrid; Javier M., analista/CDMX) con datos cuantificables | Integrado (P4) |
| 5 | Sección libre: **¿Cómo funciona?** | 3 pasos (P6) + frase de cierre que responde a la objeción de Elena | Integrado (P6) |
| 6 | Formulario de captura | Nombre, correo, perfil y consentimiento, con validación y mensaje de éxito | Existe |
| 7 | Footer | Nombre del proyecto, aviso de privacidad y año dinámico | Existe |

Nota: la sección "Privacidad" actual **no cuenta** como sección libre (la lista
permitida es ¿Cómo funciona?, Precios, FAQ, Equipo, Galería o Video). Se
mantiene como contenido de apoyo dentro del footer o sección propia informativa.

## 4. Boceto de baja fidelidad

Realizado como **wireframe digital de baja fidelidad**:

- `docs/boceto_planificacion.png` — versión gráfica (8 secciones, paleta y tipografías).
- `docs/boceto_planificacion.md` — versión texto con el esquema en ASCII.

Referencia textual (wireframe actual, a reemplazar por el boceto):

```
+--------------------------------------------------+
| [logo] ResumIA       [anclas]      [Acceso beta] |
+--------------------------------------------------+
| HERO                              [ilustración]  |
| título + subtítulo + CTA + nota                  |
+--------------------------------------------------+
| BENEFICIOS: [x4–5 iconos + texto]                |
+--------------------------------------------------+
| TESTIMONIOS: [tarjeta] [tarjeta]                 |
+--------------------------------------------------+
| ¿CÓMO FUNCIONA?: 1 → 2 → 3                       |
+--------------------------------------------------+
| FORMULARIO: nombre, correo, perfil, check        |
+--------------------------------------------------+
| FOOTER                                           |
+--------------------------------------------------+
```

## 5. Brief creativo con IA

Respuesta de Google AI Studio (Prompt P1, ejecución con evidencia; la primera
ejecución no quedó guardada y el prompt se repitió). Paleta adoptada para el
proyecto y que se aplicará en la Fase 3 (CSS):

| Rol | Color | HEX | Justificación |
|---|---|---|---|
| Primario | Azul inteligencia | `#2563EB` | Confianza, tecnología y claridad mental |
| Secundario | Azul profundo | `#1E293B` | Seriedad y profundidad; ideal para texto principal |
| Acento | Naranja energía | `#F59E0B` | Contraste vibrante para el botón CTA |
| Fondo | Blanco académico | `#F8FAFC` | Reduce la fatiga visual en lecturas largas |
| Texto | Gris carbón | `#334155` | Menos agresivo que el negro puro, buena legibilidad |

Tipografías — **seleccionada la Opción B** (refuerza el tono académico e
intelectual del producto; máximo 2 familias permitidas):

- **Opción B (seleccionada):** títulos **Lora** (Bold 700) — serif editorial con matiz académico; cuerpo **Inter** (Regular 400) — legibilidad impecable en párrafos.
- Opción A (descartada): Inter (700) en títulos e Inter (400) en cuerpo — correcta pero genérica.

Tono: **inteligente, metódico y estimulante**. Titular de ejemplo:
"Domina tu lectura académica sin perder horas: transforma documentos densos en
el conocimiento que realmente importa."

Contraste declarado por la IA (se reverificará con WebAIM en Fase 3):
texto `#334155` sobre `#F8FAFC` ≈ 9.5:1; blanco sobre botón `#2563EB` ≈ 5.2:1.

Cambios respecto al diseño actual: el acento pasa de violeta `#7c3aed` a naranja
`#F59E0B`, el primario se mantiene en `#2563EB`, y se incorporan 2 familias de
Google Fonts (Lora + Inter) en lugar de la pila del sistema.

---

## Evidencias de la Fase 1 (checklist)

- [x] Capturas de la sesión de AI Studio (Prompt P1) → `docs/capturas/ai_studio_p1_brief.png`
- [x] Capturas de la sesión de AI Studio (Prompt P2) → `docs/capturas/ai_studio_p2_buyer.png`
- [x] Respuestas pegadas en este documento
- [x] Boceto de baja fidelidad (`docs/boceto_planificacion.png`)
- [x] Documento de planificación incluido en el ZIP (versión markdown en `docs/`)
