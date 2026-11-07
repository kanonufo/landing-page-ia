/* =====================================================================
   ResumIA — countdown.js
   Snippet de conversión: contador regresivo hasta el cierre de la
   cohorte. La fecha límite se conserva en localStorage para que no se
   reinicie en cada visita.
   IIFE para encapsular el temporizador (protocolo del sistema E3.3).
   ===================================================================== */
(function () {
  "use strict";

  const contenedor = document.getElementById("resumia-countdown");
  if (!contenedor) return;

  const CLAVE_FIN = "resumia_countdown_fin";
  const DIAS_COHORTE = 14;
  const DURACION_MS = DIAS_COHORTE * 24 * 60 * 60 * 1000;
  const UN_SEGUNDO = 1000;

  const salidas = {
    dias: document.getElementById("countdown-dias"),
    horas: document.getElementById("countdown-horas"),
    minutos: document.getElementById("countdown-minutos"),
    segundos: document.getElementById("countdown-segundos")
  };

  let intervalo = null;

  function leerFin() {
    try {
      const guardado = Number(localStorage.getItem(CLAVE_FIN));
      if (Number.isFinite(guardado) && guardado > 0) return guardado;
    } catch (e) {
      // Sin almacenamiento: se usa una fecha efímera para esta visita.
    }
    return 0;
  }

  function guardarFin(valor) {
    try {
      localStorage.setItem(CLAVE_FIN, String(valor));
    } catch (e) {
      // La cuenta funciona igual durante la sesión.
    }
  }

  // Fecha límite: la guardada o una nueva ventana de 14 días.
  let fin = leerFin();
  if (!fin) {
    fin = Date.now() + DURACION_MS;
    guardarFin(fin);
  }

  function dosDigitos(numero) {
    return String(numero).padStart(2, "0");
  }

  function pintar(restante) {
    const totalSegundos = Math.max(0, Math.floor(restante / UN_SEGUNDO));
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    if (salidas.dias) salidas.dias.textContent = dosDigitos(dias);
    if (salidas.horas) salidas.horas.textContent = dosDigitos(horas);
    if (salidas.minutos) salidas.minutos.textContent = dosDigitos(minutos);
    if (salidas.segundos) salidas.segundos.textContent = dosDigitos(segundos);
  }

  function actualizar() {
    const restante = fin - Date.now();

    if (restante <= 0) {
      pintar(0);
      contenedor.classList.add("is-finalizado");
      if (intervalo) window.clearInterval(intervalo);
      return;
    }
    pintar(restante);
  }

  function iniciar() {
    actualizar();

    // Si la cohorte ya cerró, se oculta el reloj y se mantiene el CTA.
    if (fin - Date.now() <= 0) return;

    intervalo = window.setInterval(actualizar, UN_SEGUNDO);

    // Ahorra ciclos cuando la pestaña no está visible.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (intervalo) window.clearInterval(intervalo);
        intervalo = null;
      } else if (!intervalo && fin - Date.now() > 0) {
        actualizar();
        intervalo = window.setInterval(actualizar, UN_SEGUNDO);
      }
    });
  }

  iniciar();
})();
