/* =====================================================================
   ResumIA — Lógica del formulario (JavaScript vanilla, sin frameworks)
   - Validación accesible en cliente
   - Mensajes de error por campo + estado aria-invalid
   - Mensaje de éxito
   ===================================================================== */
(function () {
  "use strict";

  var formulario = document.getElementById("formulario");
  var mensajeExito = document.getElementById("mensaje-exito");
  var intentoEnvio = false; // se activa tras el primer intento de envío

  // Reglas de validación por campo. Cada función devuelve el mensaje de error
  // o null si el valor es válido.
  var reglas = {
    nombre: function (valor) {
      if (!valor.trim()) return "Escribe tu nombre.";
      if (valor.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return null;
    },
    email: function (valor) {
      if (!valor.trim()) return "Escribe tu correo electrónico.";
      // Patrón básico y suficiente para validar en cliente.
      var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patron.test(valor.trim())) return "Introduce un correo válido (ej. nombre@dominio.com).";
      return null;
    },
    rol: function (valor) {
      if (!valor) return "Selecciona tu perfil.";
      return null;
    },
    consentimiento: function (_valor, campo) {
      if (!campo.checked) return "Debes aceptar la política para continuar.";
      return null;
    }
  };

  // Muestra el error de un campo (o lo limpia si no hay error).
  function mostrarError(campo, mensaje) {
    var idError = campo.getAttribute("aria-describedby");
    var cajaError = idError ? document.getElementById(idError) : null;

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
    var regla = reglas[campo.name];
    if (!regla) return true;
    return mostrarError(campo, regla(campo.value, campo));
  }

  // Valida el formulario completo y devuelve true si todo es correcto.
  function validarFormulario() {
    var campos = formulario.querySelectorAll("input[name], select[name]");
    var primerInvalido = null;

    campos.forEach(function (campo) {
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

  // Validación en vivo: en blur solo valida si el usuario ya intentó enviar
  // o si el campo de texto ya tiene contenido (evita errores prematuros al tabular).
  formulario.querySelectorAll("input[name], select[name]").forEach(function (campo) {
    campo.addEventListener("blur", function () {
      if (intentoEnvio) {
        validarCampo(campo);
      } else if (campo.type !== "checkbox" && campo.value.trim() !== "") {
        validarCampo(campo);
      }
    });
    // Limpiar el error en cuanto el usuario corrige el campo.
    campo.addEventListener("input", function () {
      if (campo.getAttribute("aria-invalid") === "true") {
        validarCampo(campo);
      }
    });
    campo.addEventListener("change", function () {
      if (campo.getAttribute("aria-invalid") === "true") {
        validarCampo(campo);
      }
    });
  });

  // Envío del formulario.
  formulario.addEventListener("submit", function (evento) {
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
  });

  // Permite volver a enviar el formulario tras el mensaje de éxito.
  var botonReiniciar = document.getElementById("reiniciar");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", function () {
      formulario.reset();
      intentoEnvio = false;
      formulario.querySelectorAll("input[name], select[name]").forEach(function (campo) {
        mostrarError(campo, null);
      });
      if (mensajeExito) {
        mensajeExito.hidden = true;
      }
      formulario.hidden = false;
      var primero = formulario.querySelector("input[name]");
      if (primero) {
        primero.focus();
      }
    });
  }

  // Año dinámico en el pie de página.
  var anio = document.getElementById("anio");
  if (anio) {
    anio.textContent = String(new Date().getFullYear());
  }

  // =====================================================================
  // Animaciones de aparición y cabecera con scroll (P12)
  // =====================================================================

  // Marca que JS está activo: habilita los estados iniciales de animación.
  document.documentElement.classList.add("js");

  // Muestra las secciones .animate-on-scroll al entrar al viewport.
  function iniciarObservadorScroll() {
    const secciones = document.querySelectorAll(".animate-on-scroll");

    // Sin soporte de IntersectionObserver: se muestran todas directamente.
    if (!("IntersectionObserver" in window)) {
      secciones.forEach(function (seccion) {
        seccion.classList.add("is-visible");
      });
      return;
    }

    const observador = new IntersectionObserver(
      function (entradas, obs) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            obs.unobserve(entrada.target); // animar una sola vez
          }
        });
      },
      { threshold: 0.15 }
    );

    secciones.forEach(function (seccion) {
      observador.observe(seccion);
    });
  }

  // Añade .cabecera--scrolled cuando el scroll supera 80 px.
  function iniciarEfectoHeader() {
    const cabecera = document.querySelector(".cabecera");
    if (!cabecera) return;

    function manejarScroll() {
      if (window.scrollY > 80) {
        cabecera.classList.add("cabecera--scrolled");
      } else {
        cabecera.classList.remove("cabecera--scrolled");
      }
    }

    manejarScroll(); // estado correcto si se recarga con scroll
    window.addEventListener("scroll", manejarScroll, { passive: true });
  }

  iniciarObservadorScroll();
  iniciarEfectoHeader();
})();
