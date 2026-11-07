import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://127.0.0.1:8788";
const OUT = path.resolve("docs/unidad3/capturas");
fs.mkdirSync(OUT, { recursive: true });

const CLAVES = [
  "resumia_form_nombre",
  "resumia_form_email",
  "resumia_form_rol",
  "resumia_form_consentimiento"
];

const consola = [];
const malasRespuestas = [];

function log(name, value) {
  console.log(`[${name}] ${value}`);
}

function observar(page) {
  page.on("console", (msg) => consola.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => consola.push({ type: "pageerror", text: err.message }));
  page.on("response", (r) => {
    if (r.status() >= 400) malasRespuestas.push({ status: r.status(), url: r.url() });
  });
}

// Recorre la página para disparar IntersectionObserver y vuelve arriba.
async function revelarSecciones(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
    const paso = Math.max(300, Math.floor(window.innerHeight * 0.7));
    const alto = document.body.scrollHeight;
    for (let y = 0; y < alto; y += paso) {
      window.scrollTo(0, y);
      await esperar(90);
    }
    window.scrollTo(0, 0);
    await esperar(300);
  });
  // Refuerzo para la captura: garantiza el estado final visible.
  await page.addStyleTag({
    content: ".js .animate-on-scroll{opacity:1 !important;transform:none !important;}"
  });
  await page.waitForTimeout(150);
}

async function capturaPagina(nombre, width, height = 900) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const p = await ctx.newPage();
  observar(p);
  await p.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  await revelarSecciones(p);
  await p.screenshot({ path: path.join(OUT, `${nombre}.png`), fullPage: true });
  await ctx.close();
  log("captura", nombre);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
observar(page);

await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await revelarSecciones(page);

// 1. Estado inicial limpio.
const inicial = await page.evaluate(() => ({
  claves: Object.keys(localStorage),
  formVisible: !document.getElementById("formulario").hidden
}));
log("inicial", JSON.stringify(inicial));

// 2. Autoguardado campo por campo.
await page.fill("#nombre", "Elena Vázquez");
await page.fill("#email", "elena@example.com");
await page.selectOption("#rol", "estudiante");
await page.check("#consentimiento");
await page.waitForTimeout(200);

const guardado = await page.evaluate((claves) => {
  const salida = {};
  claves.forEach((k) => (salida[k] = localStorage.getItem(k)));
  return salida;
}, CLAVES);
log("guardado", JSON.stringify(guardado));

// 3. Restauración tras recarga.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(500);
const restaurado = await page.evaluate(() => ({
  nombre: document.getElementById("nombre").value,
  email: document.getElementById("email").value,
  rol: document.getElementById("rol").value,
  consentimiento: document.getElementById("consentimiento").checked,
  aviso: !document.getElementById("aviso-borrador").hidden
}));
log("restaurado", JSON.stringify(restaurado));

// 4. Capturas responsive.
await capturaPagina("movil_375px", 375, 812);
await capturaPagina("tablet_768px", 768, 1024);
await capturaPagina("desktop_1280px", 1280, 900);

// 5. Envío real al servicio externo.
const respuestaPromise = page.waitForResponse(
  (r) => r.url().includes("httpbin.org/post") && r.request().method() === "POST",
  { timeout: 20000 }
);
await page.click("#boton-enviar");
const respuesta = await respuestaPromise;
const cuerpo = await respuesta.json();
await page.waitForSelector("#mensaje-exito:not([hidden])", { timeout: 10000 });
await page.waitForTimeout(400);

const trasEnvio = await page.evaluate((claves) => ({
  claves: Object.keys(localStorage).sort(),
  borradorRestante: claves.filter((k) => localStorage.getItem(k) !== null),
  convertido: localStorage.getItem("resumia_usuario_convertido"),
  nombre: localStorage.getItem("resumia_usuario_nombre"),
  texto: document.getElementById("texto-exito").textContent,
  formOculto: document.getElementById("formulario").hidden
}), CLAVES);
log("respuesta_http", `${respuesta.status()} :: ${JSON.stringify(cuerpo.json)}`);
log("tras_envio", JSON.stringify(trasEnvio));

await page.locator("#registro").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(OUT, "form_exito_convertido.png"), fullPage: false });

// 6. Usuario convertido persiste tras recarga.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(500);
const convertidoRecarga = await page.evaluate(() => ({
  formOculto: document.getElementById("formulario").hidden,
  exitoVisible: !document.getElementById("mensaje-exito").hidden,
  texto: document.getElementById("texto-exito").textContent
}));
log("convertido_recarga", JSON.stringify(convertidoRecarga));

// 7. Modo oscuro.
await page.evaluate(() => localStorage.removeItem("resumia_usuario_convertido"));
await page.reload({ waitUntil: "networkidle" });
await page.click(".tema-toggle");
await page.waitForTimeout(500);
await revelarSecciones(page);
await page.screenshot({ path: path.join(OUT, "tema_oscuro_desktop.png"), fullPage: true });

// 8. Estados del formulario.
const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
const p2 = await ctx2.newPage();
observar(p2);
await p2.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });
await p2.waitForTimeout(500);
await p2.click("#boton-enviar");
await p2.waitForTimeout(400);
await p2.locator("#registro").scrollIntoViewIfNeeded();
await p2.screenshot({ path: path.join(OUT, "form_validacion_errores.png"), fullPage: false });
await p2.fill("#nombre", "Elena Vázquez");
await p2.fill("#email", "elena@example.com");
await p2.selectOption("#rol", "estudiante");
await p2.check("#consentimiento");
await p2.waitForTimeout(300);
await p2.screenshot({ path: path.join(OUT, "form_borrador_guardado.png"), fullPage: false });
await ctx2.close();

// 9. Snippets: FAQ, contador, progreso y botón superior.
const ctx3 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p3 = await ctx3.newPage();
observar(p3);
await p3.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });
await p3.waitForTimeout(600);
await p3.locator("#faq").scrollIntoViewIfNeeded();
await p3.waitForTimeout(600);
await p3.click("#faq-pregunta-1");
await p3.waitForTimeout(400);
await p3.screenshot({ path: path.join(OUT, "faq_abierto.png"), fullPage: false });
await p3.locator("#acceso").scrollIntoViewIfNeeded();
await p3.waitForTimeout(600);
await p3.screenshot({ path: path.join(OUT, "countdown.png"), fullPage: false });
await p3.evaluate(() => window.scrollTo(0, Math.floor(document.body.scrollHeight * 0.55)));
await p3.waitForTimeout(600);
await p3.screenshot({ path: path.join(OUT, "progreso_lectura.png"), fullPage: false });
const progreso = await p3.evaluate(() => ({
  barra: getComputedStyle(document.getElementById("resumia-progress-bar")).transform,
  botonVisible: !document.getElementById("resumia-top").hidden,
  faqAbierta: document.getElementById("faq-pregunta-1").getAttribute("aria-expanded")
}));
log("snippets", JSON.stringify(progreso));
await ctx3.close();

// 10. Log real de consola y respuestas fallidas.
const errores = consola.filter((m) => m.type === "error" || m.type === "pageerror");
fs.writeFileSync(
  path.join(OUT, "consola_devtools.json"),
  JSON.stringify({ errores, malasRespuestas, todos: consola }, null, 2),
  "utf8"
);
log("consola_errores", errores.length);
log("respuestas_4xx", malasRespuestas.length);

// 11. Estructura y conteo de tokens.
const estructura = await page.evaluate(() => {
  const reglas = Array.from(document.styleSheets).flatMap((h) => {
    try { return Array.from(h.cssRules); } catch { return []; }
  });
  const raiz = reglas.find((r) => r.selectorText === ":root");
  return {
    titulo: document.title,
    secciones: Array.from(document.querySelectorAll("main section")).map((s) => s.id),
    tokens: raiz ? Array.from(raiz.style).filter((p) => p.startsWith("--")).length : 0,
    scripts: Array.from(document.scripts).map((s) => s.getAttribute("src")),
    faqPreguntas: document.querySelectorAll(".resumia-faq__pregunta").length
  };
});
fs.writeFileSync(path.join(OUT, "estructura.json"), JSON.stringify(estructura, null, 2), "utf8");
log("estructura", JSON.stringify(estructura));

await browser.close();
console.log("DONE");
