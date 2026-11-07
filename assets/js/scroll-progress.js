/* =====================================================================
   ResumIA — scroll-progress.js
   Snippet de navegación y utilidad: barra de progreso de lectura y
   botón "volver arriba". Ambos son mejoras progresivas.
   IIFE para encapsular el estado (protocolo del sistema E3.3).
   ===================================================================== */
(function () {
  "use strict";

  const barra = document.getElementById("resumia-progress-bar");
  const boton = document.getElementById("resumia-top");
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!barra && !boton) return;

  let pendiente = false;

  function porcentajeLeido() {
    const recorrido = document.documentElement.scrollTop || document.body.scrollTop;
    const alto = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (alto <= 0) return 0;
    return Math.min(1, Math.max(0, recorrido / alto));
  }

  function pintar() {
    const progreso = porcentajeLeido();

    if (barra) {
      // Escala la barra sin provocar recálculos de layout.
      barra.style.transform = "scaleX(" + progreso.toFixed(4) + ")";
    }

    if (boton) {
      const visible = window.scrollY > 480;
      boton.hidden = !visible;
    }

    pendiente = false;
  }

  function alDesplazar() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(pintar);
  }

  if (boton) {
    boton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducido.matches ? "auto" : "smooth"
      });
    });
  }

  window.addEventListener("scroll", alDesplazar, { passive: true });
  window.addEventListener("resize", alDesplazar, { passive: true });

  pintar();
})();
