# Biblioteca de prompts — ResumIA

Registro de los prompts usados para generar la landing page con IA
(requisito de la asignatura). Organizados por componente.

## 0. Contexto base (reutilizable)
```
[CONTEXTO] Estoy creando una landing page para "ResumIA", una startup ficticia
de IA que convierte PDFs en resumenes. [AUDIENCIA] estudiantes y profesionales.
[RESTRICCIONES] HTML semantico, CSS mobile-first, JavaScript vanilla, sin
frameworks, nomenclatura BEM, accesibilidad WCAG 2.1 AA, codigo comentado.
[FORMATO] Devuelve solo el codigo, sin explicaciones.
```

## 1. Estructura y plan
```
Actua como desarrollador frontend. Propon la estructura de secciones de una
landing page de acceso anticipado (hero + beneficios + formulario + footer)
y justifica el orden pensando en la conversion.
```

## 2. Hero
```
Genera el HTML semantico del hero con: etiqueta, titular con propuesta de valor,
subtitulo, CTA que enlaza al formulario (#registro) y una imagen (assets/hero.svg).
Usa BEM con el bloque "hero" y anade atributos de accesibilidad.
```

## 3. Beneficios
```
Crea una seccion de 3 beneficios (Rapido, Preciso, Privado) usando una lista <ul>,
cada tarjeta con icono SVG inline, titulo <h3> y texto. Nomenclatura BEM
(bloque "beneficio"). Iconos decorativos con aria-hidden="true".
```

## 4. Formulario de captura
```
Crea un formulario accesible con: nombre (texto, requerido), email (requerido),
perfil (select con opciones), checkbox de consentimiento. Cada campo con <label>,
aria-describedby apuntando a su mensaje de error y boton de envio.
Usa novalidate para controlar la validacion con JavaScript.
```

## 5. CSS (mobile-first)
```
Escribe el CSS con variables :root, reset, botones reutilizables, y estilos para
hero, beneficios, formulario y footer. Movil primero y media query en 768px.
Incluye :focus-visible, contraste AA y prefers-reduced-motion.
```

## 6. JavaScript (validacion)
```
Escribe JavaScript vanilla (sin frameworks) que valide el formulario al enviar:
nombre (min 2), email (regex), perfil (no vacio) y consentimiento (marcado).
Muestra errores por campo, usa aria-invalid, enfoca el primer campo con error
y muestra un mensaje de exito. Limpia errores al salir del campo.
```

## 7. Accesibilidad y revision
```
Revisa el codigo contra WCAG 2.1 AA: contraste de color, foco visible, textos
alternativos, etiquetas de formulario y regiones de error. Indica mejoras.
```
