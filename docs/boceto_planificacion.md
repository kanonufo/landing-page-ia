# 🗺️ Boceto de planificación — ResumIA (Fase 1)

> Wireframe de **baja fidelidad** del proyecto Unidad 2.
> Vista: `docs/boceto_planificacion.png` (versión gráfica) · este documento (versión texto).

**Estudiante:** Juan Pablo Barrero · **Producto:** SaaS que resume PDFs con IA ·
**Objetivo:** capturar correos para la beta · **Enfoque:** mobile-first

---

## 🧩 Las 8 secciones, en orden

```
┌──────────────────────────────────────────────────────────────┐
│ 1 · HEADER   [logo ResumIA]   Beneficios · Cómo funciona ·   │
│              Testimonios                      [Acceso beta]  │
├──────────────────────────────────────────────────────────────┤
│ 2 · HERO                                                      │
│   ┌───────────────────────────────┐   ┌──────────────────┐   │
│   │ (Beta abierta · IA)           │   │                  │   │
│   │ H1: propuesta de valor        │   │   ilustración    │   │
│   │ subtítulo (≤30 palabras)      │   │   (PDF → IA →    │   │
│   │ [Reservar mi lugar ahora]     │   │    resumen)      │   │
│   │ [Ver beneficios]              │   │                  │   │
│   │ microcopy anti-fricción       │   │                  │   │
│   └───────────────────────────────┘   └──────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│ 3 · BENEFICIOS (5 tarjetas)                                   │
│   ┌────────┐ ┌────────┐ ┌────────┐                            │
│   │ ⚡ 1/5 │ │ 🛡️ 2/5 │ │ 🔒 3/5 │   ← 1 col móvil            │
│   └────────┘ └────────┘ └────────┘     2 col ≥480px           │
│   ┌────────┐ ┌────────┐                3 col ≥768px           │
│   │ 🔽 4/5 │ │ ⏱️ 5/5 │                                       │
│   └────────┘ └────────┘                                       │
├──────────────────────────────────────────────────────────────┤
│ 4 · TESTIMONIOS (2)                                           │
│   ┌──────────────────────┐  ┌──────────────────────┐         │
│   │ “ cita con cifras    │  │ “ cita con cifras    │         │
│   │   Nombre · Ciudad    │  │   Nombre · Ciudad    │         │
│   └──────────────────────┘  └──────────────────────┘         │
├──────────────────────────────────────────────────────────────┤
│ 5 · ¿CÓMO FUNCIONA?                                           │
│   (1) Sube tu documento → (2) La IA lo analiza →             │
│   (3) Recibe resultados clave · frase de cierre              │
├──────────────────────────────────────────────────────────────┤
│ 6 · FORMULARIO (tarjeta centrada)                             │
│   Nombre · Correo · Perfil · [x] Consentimiento              │
│              [ Quiero mi acceso ]                            │
├──────────────────────────────────────────────────────────────┤
│ 7 · PRIVACIDAD (texto informativo breve)                      │
├──────────────────────────────────────────────────────────────┤
│ 8 · FOOTER  ResumIA · proyecto de demostración · © 2026      │
└──────────────────────────────────────────────────────────────┘
```

## 🎨 Paleta (brief creativo, Prompt P1)

| Rol | HEX | Uso |
|---|---|---|
| Primario | `#2563EB` | Botones, enlaces, foco |
| Acento | `#F59E0B` | Detalles, numeración, degradados |
| Fondo alterno | `#F8FAFC` | Secciones con patrón de puntos |
| Texto | `#334155` | Cuerpo y titulares oscuros |
| Footer | `#0F172A` | Pie de página |

## ✍️ Tipografías (máximo 2 familias)

- **Lora** (700) → titulares H1–H3, aporta el tono académico.
- **Inter** (400 y 600) → cuerpo, botones y formularios.

## 📐 Reglas de maquetación

| Regla | Valor |
|---|---|
| Enfoque | Mobile-first |
| Breakpoints | 480px · 768px · 1200px |
| Nomenclatura | BEM |
| Accesibilidad | WCAG 2.1 AA, contraste ≥ 4.5:1 |
| Temas | Claro y oscuro (localStorage) |
| CTA principal | "Reservar mi lugar ahora" |

---

*Versión gráfica del boceto: `docs/boceto_planificacion.png`.*
