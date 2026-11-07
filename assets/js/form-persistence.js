/* =====================================================================
   ResumIA — form-persistence.js
   Persistencia y envío del formulario de captura (entregable E3.2).

   Estrategia:
   1. Autoguardado en tiempo real de cada campo en localStorage.
   2. Restauración automática del borrador al cargar la página.
   3. Detección de usuario ya convertido (mensaje en lugar del formulario).
   4. Envío real por POST al servicio externo configurado en data-endpoint.
   5. Limpieza de las claves del borrador tras un envío exitoso.

   Todas las claves usan el namespace "resumia_". El bloque vive en una
   IIFE para aislar el estado y no exponer funciones globales.
   ===================================================================== */
(function () {
  "use strict";

  const formulario = document.getElementById("formulario");
  if (!formulario) return;

  /* =====================  Configuración  ===================== */

  // Claves de almacenamiento por campo (namespace del proyecto).
  const CLAVES = {
    nombre: "resumia_form_nombre",
    email: "resumia_form_email",
    rol: "resumia_form_rol",
    consentimiento: "resumia_form_consentimiento"
  };

  // Claves de estado del usuario.
  const CLAVE_CONVERTIDO = "resumia_usuario_convertido";
  const CLAVE_NOMBRE = "resumia_usuario_nombre";

  // Servicio externo de captura. En producción: https://formspree.io/f/TU_ID
  const ENDPOINT = formulario.dataset.endpoint || "";
  const TIEMPO_MAXIMO_MS = 12000;

  // Referencias del DOM.
  const mensajeExito = document.getElementById("mensaje-exito");
  const textoExito = document.getElementById("texto-exito");
  const estadoEnvio = document.getElementById("estado-envio");
  const botonEnviar = document.getElementById("boton-enviar");
  const avisoBorrador = document.getElementById("aviso-borrador");
  const campos = Array.from(formulario.querySelectorAll("input[name], select[name]"));

  let intentoEnvio = false; // se activa tras el primer intento de envío

  /* =====================  Acceso seguro al almacenamiento  ===================== */

  function guardar(clave, valor) {
    try {
      localStorage.setItem(clave, valor);
    } catch (e) {
      // Modo privado o almacenamiento lleno: el formulario sigue funcionando
      // en memoria, solo se pierde la persistencia entre recargas.
    }
  }

  function leer(clave) {
    try {
      return localStorage.getItem(clave);
    } catch (e) {
      return null;
    }
  }

  function borrar(clave) {
    try {
      localStorage.removeItem(clave);
    } catch (e) {
      // Sin almacenamiento disponible no hay nada que limpiar.
    }
  }

  /* =====================  Autoguardado  ===================== */

  function claveDe(campo) {
    return CLAVES[campo.name] || null;
  }

  function guardarCampo(campo) {
    const clave = claveDe(campo);
    if (!clave) return; // el honeypot y campos ajenos no se persisten

    if (campo.type === "checkbox") {
      guardar(clave, campo.checked ? "true" : "false");
    } else {
      guardar(clave, campo.value);
    }
  }

  function guardarBorradorCompleto() {
    campos.forEach(guardarCampo);
  }

  function limpiarBorrador() {
    Object.values(CLAVES).forEach(borrar);
  }

  function iniciarAutoguardado() {
    campos.forEach((campo) => {
      if (!claveDe(campo)) return;

      // "input" cubre escritura, pegado y borrado en texto y correo.
      campo.addEventListener("input", () => guardarCampo(campo));

      // "change" es el evento fiable para select y checkbox.
      campo.addEventListener("change", () => guardarCampo(campo));
    });

    // Guardado final al abandonar la página (refuerzo del autoguardado).
    window.addEventListener("pagehide", guardarBorradorCompleto);
  }

  /* =====================  Restauración  ===================== */

  function restaurarBorrador() {
    let restaurado = false;

    campos.forEach((campo) => {
      const clave = claveDe(campo);
      if (!clave) return;

      const valor = leer(clave);
      if (valor === null) return;

      if (campo.type === "checkbox") {
        campo.checked = valor === "true";
      } else {
        campo.value = valor;
      }
      restaurado = true;
    });

    // Aviso discreto solo si realmente se recuperó contenido.
    if (restaurado && avisoBorrador) {
      avisoBorrador.hidden = false;
      window.setTimeout(() => {
        avisoBorrador.hidden = true;
      }, 6000);
    }
  }

  /* =====================  Validación accesible  ===================== */

  const reglas = {
    nombre(valor) {
      if (!valor.trim()) return "Escribe tu nombre.";
      if (valor.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return null;
    },
    email(valor) {
      if (!valor.trim()) return "Escribe tu correo electrónico.";
      // Patrón suficiente para validar en cliente; el servidor revalida.
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

  function mostrarError(campo, mensaje) {
    const idError = campo.getAttribute("aria-describedby");
    const cajaError = idError ? document.getElementById(idError) : null;

    if (mensaje) {
      campo.setAttribute("aria-invalid", "true");
      if (cajaError) {
        cajaError.textContent = mensaje; // textContent evita inyección de HTML
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

  function validarCampo(campo) {
    const regla = reglas[campo.name];
    if (!regla) return true;
    return mostrarError(campo, regla(campo.value, campo));
  }

  function validarFormulario() {
    let primerInvalido = null;

    campos.forEach((campo) => {
      if (!validarCampo(campo) && !primerInvalido) {
        primerInvalido = campo;
      }
    });

    if (primerInvalido) {
      primerInvalido.focus();
      return false;
    }
    return true;
  }

  function iniciarValidacionEnVivo() {
    campos.forEach((campo) => {
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

  /* =====================  Estado "usuario convertido"  ===================== */

  function mostrarConvertido(nombre) {
    const saludo = nombre
      ? "Gracias, " + nombre + ". Tu acceso está reservado."
      : "Gracias. Tu acceso está reservado.";

    if (textoExito) {
      // textContent: el nombre proviene del usuario y nunca se interpreta como HTML.
      textoExito.textContent = saludo + " Te avisaremos en cuanto tu cupo esté disponible.";
    }

    formulario.hidden = true;
    if (avisoBorrador) avisoBorrador.hidden = true;

    if (mensajeExito) {
      mensajeExito.hidden = false;
      mensajeExito.focus();
    }
  }

  function esUsuarioConvertido() {
    return leer(CLAVE_CONVERTIDO) === "true";
  }

  /* =====================  Envío al servicio externo  ===================== */

  function construirPayload() {
    return {
      nombre: campos.find((c) => c.name === "nombre").value.trim(),
      email: campos.find((c) => c.name === "email").value.trim(),
      rol: formulario.elements.rol.value,
      consentimiento: formulario.elements.consentimiento.checked,
      origen: "landing-resumia",
      _subject: "Nuevo acceso anticipado a ResumIA"
    };
  }

  function avisarEstado(mensaje, tipo) {
    if (!estadoEnvio) return;
    estadoEnvio.textContent = mensaje;
    estadoEnvio.dataset.estado = tipo || "";
  }

  async function enviarFormulario(payload) {
    // AbortController evita que la petición quede colgada indefinidamente.
    const control = new AbortController();
    const temporizador = window.setTimeout(() => control.abort(), TIEMPO_MAXIMO_MS);

    try {
      const respuesta = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        signal: control.signal
      });

      if (!respuesta.ok) {
        throw new Error("El servicio respondió con estado " + respuesta.status);
      }
      return true;
    } finally {
      window.clearTimeout(temporizador);
    }
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    intentoEnvio = true;

    if (!validarFormulario()) {
      avisarEstado("Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    // Honeypot: si un bot rellena el campo oculto, se descarta en silencio.
    const trampa = formulario.elements._gotcha;
    if (trampa && trampa.value !== "") {
      avisarEstado("No se pudo procesar el formulario.", "error");
      return;
    }

    if (!navigator.onLine) {
      avisarEstado("Sin conexión. Tus datos siguen guardados en este navegador.", "error");
      return;
    }

    if (!ENDPOINT) {
      avisarEstado("Falta configurar el servicio de envío.", "error");
      return;
    }

    const payload = construirPayload();

    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviando…";
    avisarEstado("Enviando tus datos…", "cargando");

    try {
      await enviarFormulario(payload);

      // 1) Estado de conversión persistente.
      guardar(CLAVE_CONVERTIDO, "true");
      guardar(CLAVE_NOMBRE, payload.nombre);

      // 2) Limpieza de las claves del borrador.
      limpiarBorrador();

      // 3) Interfaz de agradecimiento personalizada.
      avisarEstado("", "");
      mostrarConvertido(payload.nombre);
    } catch (error) {
      // Nunca se registran datos personales en consola.
      const mensaje = error.name === "AbortError"
        ? "El envío tardó demasiado. Inténtalo de nuevo."
        : "No pudimos enviar tus datos. Revisa tu conexión e inténtalo otra vez.";
      avisarEstado(mensaje, "error");
      botonEnviar.disabled = false;
      botonEnviar.textContent = "Quiero mi acceso";
    }
  }

  /* =====================  Reinicio voluntario  ===================== */

  function reiniciarFormulario() {
    // Permite registrar otro correo: se abandona el estado "convertido".
    borrar(CLAVE_CONVERTIDO);
    borrar(CLAVE_NOMBRE);
    limpiarBorrador();

    formulario.reset();
    intentoEnvio = false;
    avisarEstado("", "");

    campos.forEach((campo) => mostrarError(campo, null));

    if (mensajeExito) mensajeExito.hidden = true;
    formulario.hidden = false;

    botonEnviar.disabled = false;
    botonEnviar.textContent = "Quiero mi acceso";

    const primero = formulario.querySelector("input[name]");
    if (primero) primero.focus();
  }

  /* =====================  Arranque  ===================== */

  function iniciar() {
    // Si ya se convirtió en una visita anterior, no se muestra el formulario.
    if (esUsuarioConvertido()) {
      mostrarConvertido(leer(CLAVE_NOMBRE) || "");
      return;
    }

    restaurarBorrador();
    iniciarAutoguardado();
    iniciarValidacionEnVivo();
    formulario.addEventListener("submit", manejarEnvio);

    const botonReiniciar = document.getElementById("reiniciar");
    if (botonReiniciar) {
      botonReiniciar.addEventListener("click", reiniciarFormulario);
    }
  }

  iniciar();
})();
