/* =====================================================================
   ResumIA — core.js
   Utilidades base de la página: tema claro/oscuro, cabecera al hacer
   scroll, animaciones de aparición y año del pie.
   Se ejecuta dentro de una IIFE para no contaminar el ámbito global.
   ===================================================================== */
(function () {
  "use strict";

  /* Marca que JavaScript está activo: habilita los estados iniciales
     de las animaciones definidas en CSS. */
  document.documentElement.classList.add("js");

  /* =====================  Año dinámico  ===================== */

  function actualizarAnio() {
    const anio = document.getElementById("anio");
    if (anio) {
      anio.textContent = String(new Date().getFullYear());
    }
  }

  /* =====================  Animaciones de aparición  ===================== */

  function iniciarObservadorScroll() {
    const secciones = document.querySelectorAll(".animate-on-scroll");

    // Sin soporte de IntersectionObserver: se muestran todas directamente.
    if (!("IntersectionObserver" in window)) {
      secciones.forEach((seccion) => seccion.classList.add("is-visible"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            obs.unobserve(entrada.target); // animar una sola vez
          }
        });
      },
      { threshold: 0.15 }
    );

    secciones.forEach((seccion) => observador.observe(seccion));
  }

  /* =====================  Cabecera con scroll  ===================== */

  function iniciarEfectoHeader() {
    const cabecera = document.querySelector(".cabecera");
    if (!cabecera) return;

    let pendiente = false;

    const aplicar = () => {
      cabecera.classList.toggle("cabecera--scrolled", window.scrollY > 80);
      pendiente = false;
    };

    const manejarScroll = () => {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(aplicar);
    };

    aplicar(); // estado correcto si se recarga con scroll
    window.addEventListener("scroll", manejarScroll, { passive: true });
  }

  /* =====================  Tema claro / oscuro  ===================== */

  function aplicarTema(tema, boton) {
    document.documentElement.setAttribute("data-tema", tema);
    boton.setAttribute("aria-pressed", tema === "oscuro" ? "true" : "false");
    boton.setAttribute("aria-label", tema === "oscuro" ? "Activar modo claro" : "Activar modo oscuro");
    boton.textContent = tema === "oscuro" ? "☀️" : "🌙";
  }

  function obtenerTemaInicial() {
    let guardado = null;
    try {
      guardado = localStorage.getItem("resumia_tema");
    } catch (e) {
      guardado = null; // almacenamiento no disponible: se usa el sistema
    }
    if (guardado === "oscuro" || guardado === "claro") return guardado;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
  }

  function iniciarTema() {
    const boton = document.querySelector(".tema-toggle");
    if (!boton) return;

    aplicarTema(obtenerTemaInicial(), boton);

    boton.addEventListener("click", () => {
      const esOscuro = document.documentElement.getAttribute("data-tema") === "oscuro";
      const nuevoTema = esOscuro ? "claro" : "oscuro";
      aplicarTema(nuevoTema, boton);
      try {
        localStorage.setItem("resumia_tema", nuevoTema);
      } catch (e) {
        // Sin persistencia disponible: el tema se mantiene en la sesión.
      }
    });
  }

  /* =====================  Arranque  ===================== */

  actualizarAnio();
  iniciarObservadorScroll();
  iniciarEfectoHeader();
  iniciarTema();
})();
