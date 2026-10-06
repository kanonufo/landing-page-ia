# ResumIA — Landing page

Landing page de captura de leads para **ResumIA**, una startup ficticia de IA que
convierte documentos **PDF** en **resúmenes** claros.

Proyecto de la electiva *Landing Pages: Desarrollo web acelerado con Google AI Studio*
(**Unidad 2**: copywriting, HTML semántico, CSS responsive y JavaScript), construido
con HTML5, CSS3 y JavaScript vanilla, usando Google AI Studio (Gemini) como asistente.

## Demo

- **En vivo:** https://kanonufo.github.io/landing-page-ia/
- **Repositorio:** https://github.com/kanonufo/landing-page-ia
- En local: abre `index.html` en el navegador (no necesita servidor ni build).

## Secciones

1. **Header** — logo, menú de anclas y CTA, con cambio visual al hacer scroll.
2. **Hero** — propuesta de valor, subtítulo, CTA y microcopy anti-fricción.
3. **Beneficios** — 5 tarjetas con icono, título y descripción.
4. **Testimonios** — 2 testimonios con datos cuantificables.
5. **¿Cómo funciona?** — 3 pasos con conectores en escritorio.
6. **Formulario** — nombre, correo, perfil y consentimiento, con validación accesible.
7. **Privacidad** — aviso del proyecto de demostración.
8. **Footer** — marca, descripción y año dinámico.

## Funcionalidades JavaScript

- Validación de formulario en `blur` y `submit`, con mensajes inline (`aria-invalid`,
  `role="alert"`), foco en el primer campo inválido y limpieza del error al corregir.
- Animaciones de aparición con **Intersection Observer** en 3 secciones
  (`.animate-on-scroll`), con fallback sin soporte y respeto de `prefers-reduced-motion`.
- **Cabecera** que cambia de apariencia al superar 80px de scroll.
- **Modo oscuro** con botón accesible (`aria-pressed`), persistencia en `localStorage`
  (con `try/catch`) y respeto de `prefers-color-scheme` en la primera visita.

## Tecnologías y buenas prácticas

- HTML5 semántico validado en W3C (0 errores, 0 advertencias).
- CSS mobile-first con variables en `:root`, BEM y breakpoints en 480/768/1200.
- JavaScript ES6+ vanilla (solo `const`/`let`), sin frameworks ni librerías.
- Accesibilidad WCAG 2.1 AA: contraste ≥4.5:1, navegación por teclado, foco visible,
  etiquetas asociadas y regiones de error.
- Tipografías de Google Fonts: Lora (títulos) e Inter (cuerpo).

## Estructura

```
.
├── index.html                  # Estructura semántica de la página
├── styles.css                  # Estilos (mobile-first, BEM, temas claro/oscuro)
├── script.js                   # Validación, animaciones, cabecera y tema
├── assets/
│   ├── images/hero.svg         # Ilustración del hero
│   └── icons/favicon.svg       # Icono del sitio
├── docs/
│   ├── DiarioDePrompts.pdf     # Diario de prompts (entregable)
│   ├── ReflexionCritica.pdf    # Reflexión personal (entregable)
│   ├── diario_prompts.md       # Fuente del diario (21 prompts)
│   ├── planificacion.md        # Buyer persona, brief creativo y secciones
│   ├── boceto_planificacion.png / .md
│   ├── brief.md, prompts.md    # Material de trabajo de la Unidad 1
│   └── capturas/               # Evidencias (vistas, W3C, Lighthouse, formulario, AI Studio)
└── README.md
```

## Cómo probar

1. Envía el formulario vacío → aparecen los errores inline y el foco va al primer campo.
2. Prueba un correo inválido (ej. `a@b`) → error de formato solo en ese campo.
3. Completa todo y acepta el consentimiento → mensaje de éxito y opción de reiniciar.
4. Baja por la página → las secciones aparecen con fade y la cabecera cambia a partir de 80px.
5. Pulsa el botón 🌙/☀️ de la cabecera → alterna el tema y lo recuerda al recargar.

## Documentación

- `docs/diario_prompts.md` — evidencia del proceso de prompting (Fases 1–5).
- `docs/planificacion.md` — planificación: producto, buyer persona, secciones y brief creativo.
- `docs/capturas/` — capturas exigidas por el entregable (3 vistas, Lighthouse, W3C,
  validación del formulario y sesiones de AI Studio).

---

Proyecto académico · Código generado con IA (prompts en `docs/diario_prompts.md`).
