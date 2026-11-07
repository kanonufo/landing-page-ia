import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://127.0.0.1:8788";
const OUT = path.resolve("docs/unidad3/E31_auditoria");
const CAP = path.resolve("docs/unidad3/capturas");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function correr(url, accion) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
  const page = await ctx.newPage();
  const eventos = [];
  page.on("console", (m) => eventos.push({ tipo: m.type(), texto: m.text() }));
  page.on("pageerror", (e) => eventos.push({ tipo: "pageerror", texto: e.message }));
  page.on("requestfailed", (r) =>
    eventos.push({ tipo: "requestfailed", texto: `${r.url()} :: ${r.failure()?.errorText}` })
  );
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await accion(page);
  await page.waitForTimeout(800);
  await ctx.close();
  return eventos;
}

// ---------- Código original ----------
const eventosOriginal = await correr("/docs/unidad3/E31_auditoria/codigo_original.html", async (page) => {
  await page.screenshot({ path: path.join(CAP, "e31_original_antes.png"), fullPage: true });
  await page.type("#nombre", "Elena <b>Vázquez</b>", { delay: 15 });
  await page.type("#email", "elena@example.com", { delay: 10 });
  await page.selectOption("#rol", "estudiante");
  await page.check("#consentimiento");
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(CAP, "e31_original_xss.png"), fullPage: true });

  const saludo = await page.evaluate(() => document.getElementById("saludo").innerHTML);
  const listeners = await page.evaluate(() => document.getElementById("nombre").value);
  fs.writeFileSync(
    path.join(OUT, "evidencia_dom_original.json"),
    JSON.stringify({ saludoHTML: saludo, valorNombre: listeners }, null, 2),
    "utf8"
  );

  await page.click("#form button");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(CAP, "e31_original_error.png"), fullPage: true });
});

// ---------- Código corregido ----------
const eventosCorregido = await correr("/docs/unidad3/E31_auditoria/codigo_corregido.html", async (page) => {
  await page.type("#nombre", "Elena <b>Vázquez</b>", { delay: 10 });
  await page.type("#email", "elena@example.com", { delay: 10 });
  await page.selectOption("#rol", "estudiante");
  await page.check("#consentimiento");
  await page.click("#boton-enviar");
  await page.waitForSelector("#exito:not([hidden])", { timeout: 20000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(CAP, "e31_corregido_exito.png"), fullPage: true });

  const estado = await page.evaluate(() => ({
    saludo: document.getElementById("exito-texto").textContent,
    claves: Object.keys(localStorage).sort(),
    formOculto: document.getElementById("formulario").hidden
  }));
  fs.writeFileSync(path.join(OUT, "evidencia_dom_corregido.json"), JSON.stringify(estado, null, 2), "utf8");
});

fs.writeFileSync(
  path.join(OUT, "evidencia_consola.json"),
  JSON.stringify({ original: eventosOriginal, corregido: eventosCorregido }, null, 2),
  "utf8"
);

console.log("ORIGINAL:");
eventosOriginal.forEach((e) => console.log(`  [${e.tipo}] ${e.texto}`));
console.log("CORREGIDO:");
eventosCorregido.forEach((e) => console.log(`  [${e.tipo}] ${e.texto}`));

await browser.close();
console.log("DONE");
