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

Respuesta seleccionada de Google AI Studio (Prompt P2):

| Campo | Valor |
|---|---|
| Nombre ficticio | Valentina Ríos |
| Edad | 28 años |
| Ocupación | Estudiante de maestría en Educación y asistente de investigación universitaria |
| Dolor principal | "Tengo más de 20 PDFs académicos pendientes esta semana y paso horas leyendo paja solo para descubrir que la mitad no me servía para mi tesis." |
| Deseo principal | Filtrar e identificar en minutos los aportes reales de cada documento para enfocar su tiempo en analizar, redactar y avanzar con su investigación. |
| Objeción más común | "Seguro me van a llenar la bandeja de spam o la beta terminará siendo una prueba corta que luego me pida tarjeta de crédito." → Se desmonta con: "Tu correo solo se usará para enviarte tu invitación prioritaria a la beta gratuita, sin pedir datos de pago ni enviarte promociones innecesarias." |

Motivación principal: recuperar tiempo valioso sustituyendo la lectura exploratoria
de textos extensos por un filtrado inteligente y riguroso.

Implicaciones para el copy (Fase 2): el hero ya incluye "Sin tarjeta de crédito ·
Cancela cuando quieras" (responde a la objeción); se reforzará el mensaje de
privacidad del formulario con la respuesta textual a la objeción.

## 3. Secciones de la landing (7 obligatorias + 1 libre)

| N | Sección | Contenido específico de ResumIA | Estado |
|---|---|---|---|
| 1 | Header | Logo ResumIA + menú de anclas (Beneficios · Cómo funciona · Testimonios) + CTA secundario "Acceso anticipado" | Existe; falta el menú de anclas |
| 2 | Hero | H1 con propuesta de valor, subtítulo, descripción breve, CTA "Probar gratis" e ilustración | Existe |
| 3 | Beneficios | Mínimo 4 beneficios con icono, título y descripción (Rápido, Preciso, Privado + 1–2 nuevos) | Existen 3; faltan 1–2 |
| 4 | Testimonios (prueba social) | 2 testimonios verosímiles con nombre, cargo/ciudad y texto | Falta (se genera en Fase 2) |
| 5 | Sección libre: **¿Cómo funciona?** | 3 pasos: Sube tu PDF → La IA lo analiza → Recibe tu resumen | Falta (se genera en Fase 2) |
| 6 | Formulario de captura | Nombre, correo, perfil y consentimiento, con validación y mensaje de éxito | Existe |
| 7 | Footer | Nombre del proyecto, aviso de privacidad y año dinámico | Existe |

Nota: la sección "Privacidad" actual **no cuenta** como sección libre (la lista
permitida es ¿Cómo funciona?, Precios, FAQ, Equipo, Galería o Video). Se
mantiene como contenido de apoyo dentro del footer o sección propia informativa.

## 4. Boceto de baja fidelidad

> Pendiente: dibujo a mano alzada (fotografiado) o Figma →
> `docs/boceto_planificacion.png`.
> Si se hace en Figma, suma +3 puntos al criterio de diseño.

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

Respuesta de Google AI Studio (Prompt P1). Paleta adoptada para el proyecto y
que se aplicará en la Fase 3 (CSS):

| Rol | Color | HEX | Justificación |
|---|---|---|---|
| Primario | Azul índigo | `#1E293B` | Seriedad académica y rigor, confianza sin verse anticuado |
| Secundario | Azul intelectual | `#2563EB` | Personalidad tecnológica SaaS; guía la navegación |
| Acento | Verde | `#047857` (CTA) / `#10B981` (gráficos) | Energía, síntesis; contraste 4.6:1 sobre blanco en el CTA |
| Fondo | Blanco hueso | `#F8FAFC` | Reduce fatiga visual en textos largos |
| Texto | Gris grafito | `#0F172A` | Nitidez sin el contraste estridente del negro puro |

Tipografías — **seleccionada la Opción A** (mayor afinidad con un producto
tecnológico; máximo 2 familias permitidas):

- **Opción A (seleccionada):** títulos **Plus Jakarta Sans** (600/700); cuerpo **Inter** (400/500).
- Opción B (descartada): títulos Lora (500/700); cuerpo Source Sans 3 (400/600) — muy editorial para un SaaS.

Tono: **clarificador, riguroso y empático**. Titular de ejemplo propuesto:
"De 50 páginas a lo esencial en segundos. Transforma textos densos en ideas
clave, conclusiones y próximos pasos claros sin perder el rigor de tu investigación."

Contraste verificado por la IA (se reverificará con WebAIM en Fase 3):
texto `#0F172A` sobre `#F8FAFC` ≈ 15.8:1; blanco sobre acento `#047857` ≈ 4.6:1.

Cambios respecto al diseño actual: el acento pasa de violeta `#7c3aed` a verde
`#047857`/`#10B981`, y se incorporan las 2 fuentes de Google (hoy pila del sistema).

---

## Evidencias de la Fase 1 (checklist)

- [ ] Capturas de la sesión de AI Studio (Prompt P1) — si el chat no se guardó, re-ejecutar y capturar
- [ ] Capturas de la sesión de AI Studio (Prompt P2) — si el chat no se guardó, re-ejecutar y capturar
- [x] Respuestas pegadas en este documento
- [ ] Boceto de baja fidelidad (`docs/boceto_planificacion.png`)
- [ ] Documento de planificación exportado a PDF/Word para el ZIP
