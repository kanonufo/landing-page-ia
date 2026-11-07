import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9228;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "rea-devtools-"));
const OUT = path.resolve("docs/unidad3/capturas");
fs.mkdirSync(OUT, { recursive: true });

const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=" + PORT, "--user-data-dir=" + profile,
  "--remote-allow-origins=*", "--disable-gpu", "--no-first-run", "about:blank"
], { stdio: "ignore" });

for (let i = 0; i < 60; i++) {
  try { if ((await fetch("http://127.0.0.1:" + PORT + "/json/version")).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 300));
}

const browser = await chromium.connectOverCDP("http://127.0.0.1:" + PORT);
const context = browser.contexts()[0];

async function devtoolsDe(page, panelName) {
  const lista = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
  const obj = lista.find((t) => t.type === "page" && t.url === page.url());
  const dt = await context.newPage();
  await dt.setViewportSize({ width: 1440, height: 900 });
  await dt.goto("devtools://devtools/bundled/inspector.html?ws=127.0.0.1:" + PORT + "/devtools/page/" + obj.id, { waitUntil: "domcontentloaded" });
  await dt.waitForTimeout(2500);
  if (panelName) {
    await dt.keyboard.press("Control+Shift+P");
    await dt.waitForTimeout(400);
    await dt.keyboard.type("Show " + panelName);
    await dt.waitForTimeout(400);
    await dt.keyboard.press("Enter");
    await dt.waitForTimeout(1400);
  }
  return dt;
}

async function ensancharDevtools(dt) {
  // Arrastra el separador para dar mas espacio al panel de DevTools.
  try {
    await dt.mouse.move(1123, 430);
    await dt.mouse.down();
    await dt.mouse.move(430, 430, { steps: 12 });
    await dt.mouse.up();
    await dt.waitForTimeout(600);
  } catch {}
}

// ---------- 1) Consola limpia (siempre en panel Console) ----------
const p1 = await context.newPage();
await p1.setViewportSize({ width: 1040, height: 860 });
await p1.goto("http://127.0.0.1:8788/index.html", { waitUntil: "networkidle" });
const dt1 = await context.newPage();
await dt1.setViewportSize({ width: 1440, height: 900 });
{
  const lista = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
  const obj = lista.find((t) => t.type === "page" && t.url === p1.url());
  await dt1.goto("devtools://devtools/bundled/inspector.html?ws=127.0.0.1:" + PORT + "/devtools/page/" + obj.id + "&panel=console", { waitUntil: "domcontentloaded" });
}
await dt1.waitForTimeout(2500);
await p1.locator("#faq").scrollIntoViewIfNeeded();
await p1.click("#faq-pregunta-1");
await p1.locator("#acceso").scrollIntoViewIfNeeded();
await dt1.waitForTimeout(1200);
await dt1.screenshot({ path: path.join(OUT, "devtools_consola_ok.png") });
console.log("OK consola limpia");

// ---------- 2) Consola con error real ----------
const p2 = await context.newPage();
await p2.setViewportSize({ width: 1040, height: 860 });
await p2.goto("http://127.0.0.1:8788/docs/unidad3/E31_auditoria/codigo_original.html", { waitUntil: "networkidle" });
const dt2 = await context.newPage();
await dt2.setViewportSize({ width: 1440, height: 900 });
{
  const lista = await (await fetch("http://127.0.0.1:" + PORT + "/json/list")).json();
  const obj = lista.find((t) => t.type === "page" && t.url === p2.url());
  await dt2.goto("devtools://devtools/bundled/inspector.html?ws=127.0.0.1:" + PORT + "/devtools/page/" + obj.id + "&panel=console", { waitUntil: "domcontentloaded" });
}
await dt2.waitForTimeout(2500);
await p2.type("#nombre", "Elena <b>Vázquez</b>", { delay: 8 });
await p2.type("#email", "elena@example.com", { delay: 8 });
await p2.selectOption("#rol", "estudiante");
await p2.check("#consentimiento");
await p2.click("#form button");
await dt2.waitForTimeout(1800);
await dt2.screenshot({ path: path.join(OUT, "devtools_consola_original.png") });
console.log("OK consola original");

// ---------- 3) Application / Local Storage ----------
const p3 = await context.newPage();
await p3.setViewportSize({ width: 1040, height: 860 });
await p3.goto("http://127.0.0.1:8788/index.html", { waitUntil: "networkidle" });
await p3.evaluate(() => localStorage.clear());
await p3.reload({ waitUntil: "networkidle" });
await p3.fill("#nombre", "Elena Vázquez");
await p3.fill("#email", "elena@example.com");
await p3.selectOption("#rol", "estudiante");
await p3.check("#consentimiento");

const dt3 = await devtoolsDe(p3, "Application");
await ensancharDevtools(dt3);
await dt3.screenshot({ path: path.join(OUT, "devtools_application_panel.png") });

let storageAbierto = false;
try {
  await dt3.locator('text="Local storage"').first().click({ timeout: 5000 });
  await dt3.keyboard.press("ArrowRight");
  await dt3.waitForTimeout(1000);
  await dt3.locator('text="http://127.0.0.1:8788"').first().click({ timeout: 5000 });
  await dt3.waitForTimeout(1200);
  for (let i = 0; i < 5; i++) { await dt3.keyboard.press("Control+Minus"); }
  await dt3.waitForTimeout(1000);
  storageAbierto = true;
} catch (e) {
  console.log("storage fallback:", e.message);
}
await dt3.screenshot({ path: path.join(OUT, "devtools_application_localstorage.png") });
console.log("localStorage abierto:", storageAbierto);

const espera = p3.waitForResponse((r) => r.url().includes("httpbin.org/post"), { timeout: 20000 });
await p3.click("#boton-enviar");
await espera;
await p3.waitForSelector("#mensaje-exito:not([hidden])", { timeout: 10000 });
await dt3.waitForTimeout(1600);
await dt3.screenshot({ path: path.join(OUT, "devtools_application_convertido.png") });
console.log("OK application convertido");

// ---------- 4) Network con POST ----------
const p4 = await context.newPage();
await p4.setViewportSize({ width: 1040, height: 860 });
await p4.goto("http://127.0.0.1:8788/index.html", { waitUntil: "networkidle" });
await p4.evaluate(() => localStorage.clear());
await p4.reload({ waitUntil: "networkidle" });
await p4.fill("#nombre", "Elena Vázquez");
await p4.fill("#email", "elena@example.com");
await p4.selectOption("#rol", "estudiante");
await p4.check("#consentimiento");
const dt4 = await devtoolsDe(p4, "Network");
await ensancharDevtools(dt4);
await dt4.waitForTimeout(700);
await p4.click("#boton-enviar");
await p4.waitForSelector("#mensaje-exito:not([hidden])", { timeout: 20000 });
await dt4.waitForTimeout(1800);
await dt4.screenshot({ path: path.join(OUT, "devtools_network_post.png") });
console.log("OK network POST");

await browser.close();
proc.kill();
