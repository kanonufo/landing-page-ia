# ResumIA — Landing page

Landing page de captura de leads para **ResumIA**, una startup ficticia de IA que
convierte documentos **PDF** en **resúmenes** claros.

Proyecto de la electiva *Landing Pages: Desarrollo web acelerado con Google AI Studio*
(Unidad 1: **Hero section + formulario de captura**).

## Demo

Abre `index.html` en el navegador (no necesita servidor ni build).

## Secciones

- **Hero** — propuesta de valor, subtítulo, ilustración y CTA.
- **Beneficios** — 3 tarjetas (Rápido, Preciso, Privado).
- **Formulario de captura** — nombre, correo, perfil, consentimiento y validación.
- **Footer** — mínimo.

## Tecnologías y buenas prácticas

- HTML5 semántico.
- CSS responsive **mobile-first** (variables, BEM).
- **JavaScript vanilla**, sin frameworks ni librerías externas.
- Nomenclatura **BEM**.
- Accesibilidad **WCAG 2.1 AA** (foco visible, `aria-invalid`, `role="alert"`, `prefers-reduced-motion`).
- Código comentado.

## Estructura

```
.
├── index.html          # Estructura de la página
├── styles.css          # Estilos (mobile-first, BEM)
├── script.js           # Validación del formulario (vanilla)
├── assets/
│   ├── hero.svg        # Ilustración del hero
│   └── favicon.svg     # Icono del sitio
├── docs/
│   ├── brief.md        # Brief del proyecto
│   └── prompts.md      # Biblioteca de prompts usados
└── README.md
```

## Cómo probar la validación

1. Envía el formulario vacío → verás los errores y el foco en el primer campo.
2. Prueba un correo inválido (ej. `a@b`) → error de formato.
3. Completa todo y acepta el consentimiento → mensaje de éxito.

## Accesibilidad

- Enlace "Saltar al contenido".
- Foco visible en todos los elementos interactivos.
- Mensajes de error asociados con `aria-describedby` y anunciados con `role="alert"`.
- Se respeta `prefers-reduced-motion`.

---

Proyecto académico · Código generado con IA (prompts en `docs/prompts.md`).
