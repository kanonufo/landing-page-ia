import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9243;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "rea-video-"));
const WORK = path.resolve("docs/unidad3/video_tmp");
const OUTDIR = path.resolve("docs/unidad3/E32_persistencia");
fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });
fs.mkdirSync(OUTDIR, { recursive: true });

const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=" + PORT, "--user-data-dir=" + profile,
  "--remote-allow-origins=*", "--disable-gpu", "--no-first-run",
  "--window-size=1920,1080", "about:blank"
], { stdio: "ignore" });

for (let i = 0; i < 60; i++) {
  try { if ((await fetch("http://127.0.0.1:" + PORT + "/json/version")).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 300));
}

const browser = await chromium.connectOverCDP("http://127.0.0.1:" + PORT);
const context = browser.contexts()[0];

const page = await context.newPage();
await page.setViewportSize({ width: 1600, height: 1080 });
await page.goto("http://127.0.0.1:8788/index.html", { waitUntil: "networkidle" });
await page.evaluate(() => { localStorage.clear(); localStorage.setItem("resumia_tema", "claro"); });
await page.reload({ waitUntil: "networkidle" });

const lista = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
const obj = lista.find((t) => t.type === "page" && t.url.includes("8788/index.html"));
const dt = await context.newPage();
await dt.setViewportSize({ width: 1920, height: 1080 });
await dt.goto("devtools://devtools/bundled/inspector.html?ws=127.0.0.1:" + PORT + "/devtools/page/" + obj.id, { waitUntil: "domcontentloaded" });
await dt.waitForTimeout(2500);

// Abrir Application y seleccionar Local Storage del origen
await dt.keyboard.press("Control+Shift+P");
await dt.waitForTimeout(400);
await dt.keyboard.type("Show Application");
await dt.waitForTimeout(400);
await dt.keyboard.press("Enter");
await dt.waitForTimeout(1600);
await dt.locator('text="Local storage"').first().click();
await dt.keyboard.press("ArrowRight");
await dt.waitForTimeout(1000);
await dt.locator('text="http://127.0.0.1:8788"').first().click();
await dt.waitForTimeout(1200);

// ---------- Captura ----------
const frames = [];
const fases = [];
const inicio = Date.now();
const transcurrido = () => (Date.now() - inicio) / 1000;

const session = await context.newCDPSession(dt);
session.on("Page.screencastFrame", async (frame) => {
  const archivo = path.join(WORK, `frame_${String(frames.length).padStart(5, "0")}.jpg`);
  fs.writeFileSync(archivo, Buffer.from(frame.data, "base64"));
  frames.push({ archivo, ts: frame.metadata.timestamp });
  try { await session.send("Page.screencastFrameAck", { sessionId: frame.sessionId }); } catch {}
});
await session.send("Page.startScreencast", { format: "jpeg", quality: 82, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });

async function esperar(ms) { await page.waitForTimeout(ms); }

async function fase(nombre, texto, fn) {
  const start = transcurrido();
  await fn();
  const end = transcurrido();
  fases.push({ nombre, texto, start, end });
  console.log(`[fase] ${nombre}: ${start.toFixed(1)}s -> ${end.toFixed(1)}s`);
}

await fase("intro-tour", "Recorrido por la landing page publicada", async () => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await esperar(2200);
  for (const id of ["beneficios", "como-funciona", "testimonios", "faq", "acceso"]) {
    await page.locator("#" + id).scrollIntoViewIfNeeded();
    await esperar(1600);
  }
});

await fase("autoguardado", "Cada campo se guarda en localStorage mientras se escribe", async () => {
  await page.locator("#registro").scrollIntoViewIfNeeded();
  await esperar(2500);
  await page.click("#nombre");
  await page.type("#nombre", "Elena Vázquez", { delay: 180 });
  await esperar(2200);
  await page.type("#email", "elena@example.com", { delay: 150 });
  await esperar(2200);
  await page.selectOption("#rol", "estudiante");
  await esperar(1200);
  await page.check("#consentimiento");
  await esperar(2600);
});

await fase("restauracion", "Al recargar, el borrador se restaura automáticamente", async () => {
  await page.reload({ waitUntil: "networkidle" });
  await esperar(2500);
  await page.locator("#registro").scrollIntoViewIfNeeded();
  await esperar(3500);
});

await fase("envio", "El formulario se envía al servicio externo y se confirma", async () => {
  await page.click("#boton-enviar");
  await page.waitForSelector("#mensaje-exito:not([hidden])", { timeout: 25000 });
  await esperar(2000);
  await page.locator("#registro").scrollIntoViewIfNeeded();
  await esperar(3000);
});

await fase("limpieza", "El borrador se limpia y el usuario queda marcado como convertido", async () => {
  await esperar(6000);
});

await fase("convertido", "En la siguiente visita se muestra el agradecimiento personalizado", async () => {
  await page.reload({ waitUntil: "networkidle" });
  await esperar(2500);
  await page.locator("#registro").scrollIntoViewIfNeeded();
  await esperar(3500);
});

const fin = transcurrido();
await session.send("Page.stopScreencast");
await dt.waitForTimeout(400);
await dt.screenshot({ path: path.join(WORK, "final.png") });

fs.writeFileSync(
  path.join(WORK, "captura.json"),
  JSON.stringify({ inicio, fin, frames: frames.map((f) => ({ archivo: path.basename(f.archivo), ts: f.ts })), fases }, null, 2),
  "utf8"
);

console.log("frames:", frames.length, "duracion captura:", fin.toFixed(1), "s");

await browser.close();
proc.kill();
