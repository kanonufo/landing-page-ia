/* =====================================================================
   ResumIA — faq.js
   Snippet de interacción: acordeón accesible de preguntas frecuentes.
   Patrón WAI-ARIA: botón con aria-expanded + región controlada.
   IIFE para encapsular el comportamiento (protocolo del sistema E3.3).
   ===================================================================== */
(function () {
  "use strict";

  const lista = document.querySelector(".resumia-faq__lista");
  if (!lista) return;

  const botones = Array.from(lista.querySelectorAll(".resumia-faq__pregunta"));

  function cerrarTodos(excepto) {
    botones.forEach((boton) => {
      if (boton === excepto) return;
      const panel = document.getElementById(boton.getAttribute("aria-controls"));
      if (!panel) return;
      boton.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      boton.closest(".resumia-faq__item").classList.remove("is-open");
    });
  }

  function alternar(boton) {
    const panel = document.getElementById(boton.getAttribute("aria-controls"));
    if (!panel) return;

    const abierto = boton.getAttribute("aria-expanded") === "true";

    if (abierto) {
      boton.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      boton.closest(".resumia-faq__item").classList.remove("is-open");
      return;
    }

    // Acordeón: solo una respuesta abierta a la vez.
    cerrarTodos(boton);
    boton.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    boton.closest(".resumia-faq__item").classList.add("is-open");
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => alternar(boton));

    // Navegación con flechas entre preguntas (mejora de teclado).
    boton.addEventListener("keydown", (evento) => {
      const indice = botones.indexOf(boton);
      let destino = null;

      if (evento.key === "ArrowDown") {
        destino = botones[(indice + 1) % botones.length];
      } else if (evento.key === "ArrowUp") {
        destino = botones[(indice - 1 + botones.length) % botones.length];
      } else if (evento.key === "Home") {
        destino = botones[0];
      } else if (evento.key === "End") {
        destino = botones[botones.length - 1];
      }

      if (destino) {
        evento.preventDefault();
        destino.focus();
      }
    });
  });
})();
