/* =====================================================================
   ResumIA — Lógica de la página (JavaScript vanilla, sin frameworks)
   - Validación accesible del formulario (blur + submit, mensajes inline)
   - Animaciones de aparición con Intersection Observer
   - Cabecera con cambio visual al hacer scroll
   ===================================================================== */
(function () {
  "use strict";

  /* =====================  Estado y utilidades  ===================== */

  // Referencias del formulario.
  const formulario = document.getElementById("formulario");
  const mensajeExito = document.getElementById("mensaje-exito");
  let intentoEnvio = false; // se activa tras el primer intento de envío

  // Reglas de validación por campo. Cada función devuelve el mensaje de error
  // o null si el valor es válido.
  const reglas = {
    nombre(valor) {
      if (!valor.trim()) return "Escribe tu nombre.";
      if (valor.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return null;
    },
    email(valor) {
      if (!valor.trim()) return "Escribe tu correo electrónico.";
      // Patrón básico y suficiente para validar en cliente.
      const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patron.test(valor.trim())) return "Introduce un correo válido (ej. nombre@dominio.com).";
      return null;
    },
    rol(valor) {
      if (!valor) return "Selecciona tu perfil.";
      return null;
    },
    consentimiento(_valor, campo) {
      if (!campo.checked) return "Debes aceptar la política para continuar.";
      return null;
    }
  };

  /* =====================  Validación del formulario  ===================== */

  // Muestra el error de un campo (o lo limpia si no hay error).
  function mostrarError(campo, mensaje) {
    const idError = campo.getAttribute("aria-describedby");
    const cajaError = idError ? document.getElementById(idError) : null;

    if (mensaje) {
      campo.setAttribute("aria-invalid", "true");
      if (cajaError) {
        cajaError.textContent = mensaje;
        cajaError.hidden = false;
      }
    } else {
      campo.removeAttribute("aria-invalid");
      if (cajaError) {
        cajaError.textContent = "";
        cajaError.hidden = true;
      }
    }
    return !mensaje;
  }

  // Valida un campo concreto según su nombre.
  function validarCampo(campo) {
    const regla = reglas[campo.name];
    if (!regla) return true;
    return mostrarError(campo, regla(campo.value, campo));
  }

  // Valida el formulario completo y devuelve true si todo es correcto.
  function validarFormulario() {
    const campos = formulario.querySelectorAll("input[name], select[name]");
    let primerInvalido = null;

    campos.forEach((campo) => {
      if (!validarCampo(campo) && !primerInvalido) {
        primerInvalido = campo;
      }
    });

    if (primerInvalido) {
      primerInvalido.focus(); // llevar el foco al primer campo con error
      return false;
    }
    return true;
  }

  // Valida en vivo: en blur solo valida si el usuario ya intentó enviar
  // o si el campo de texto ya tiene contenido (evita errores prematuros).
  // Limpia el error en cuanto el usuario corrige el campo.
  function iniciarValidacionEnVivo() {
    formulario.querySelectorAll("input[name], select[name]").forEach((campo) => {
      campo.addEventListener("blur", () => {
        if (intentoEnvio) {
          validarCampo(campo);
        } else if (campo.type !== "checkbox" && campo.value.trim() !== "") {
          validarCampo(campo);
        }
      });

      campo.addEventListener("input", () => {
        if (campo.getAttribute("aria-invalid") === "true") {
          validarCampo(campo);
        }
      });

      campo.addEventListener("change", () => {
        if (campo.getAttribute("aria-invalid") === "true") {
          validarCampo(campo);
        }
      });
    });
  }

  // Envío del formulario: valida y, si todo es correcto, muestra el éxito.
  function manejarEnvio(evento) {
    evento.preventDefault(); // demo: no enviamos a un servidor
    intentoEnvio = true;

    if (!validarFormulario()) {
      return;
    }

    // Éxito: ocultamos el formulario y mostramos el mensaje (enfocándolo).
    formulario.hidden = true;
    if (mensajeExito) {
      mensajeExito.hidden = false;
      mensajeExito.focus();
    }
  }

  // Permite volver a enviar el formulario tras el mensaje de éxito.
  function reiniciarFormulario() {
    formulario.reset();
    intentoEnvio = false;
    formulario.querySelectorAll("input[name], select[name]").forEach((campo) => {
      mostrarError(campo, null);
    });
    if (mensajeExito) {
      mensajeExito.hidden = true;
    }
    formulario.hidden = false;
    const primero = formulario.querySelector("input[name]");
    if (primero) {
      primero.focus();
    }
  }

  // Conecta los eventos del formulario (solo si existe en la página).
  function iniciarFormulario() {
    if (!formulario) return;

    iniciarValidacionEnVivo();
    formulario.addEventListener("submit", manejarEnvio);

    const botonReiniciar = document.getElementById("reiniciar");
    if (botonReiniciar) {
      botonReiniciar.addEventListener("click", reiniciarFormulario);
    }
  }

  /* =====================  Interfaz general  ===================== */

  // Año dinámico en el pie de página.
  function actualizarAnio() {
    const anio = document.getElementById("anio");
    if (anio) {
      anio.textContent = String(new Date().getFullYear());
    }
  }

  // Muestra las secciones .animate-on-scroll al entrar en el viewport.
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

  // Añade .cabecera--scrolled cuando el scroll supera 80 px.
  function iniciarEfectoHeader() {
    const cabecera = document.querySelector(".cabecera");
    if (!cabecera) return;

    const manejarScroll = () => {
      cabecera.classList.toggle("cabecera--scrolled", window.scrollY > 80);
    };

    manejarScroll(); // estado correcto si se recarga con scroll
    window.addEventListener("scroll", manejarScroll, { passive: true });
  }

  /* =====================  Arranque  ===================== */

  // Marca que JS está activo: habilita los estados iniciales de animación.
  document.documentElement.classList.add("js");

  iniciarFormulario();
  actualizarAnio();
  iniciarObservadorScroll();
  iniciarEfectoHeader();
})();
