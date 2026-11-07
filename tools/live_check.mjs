import { chromium } from "playwright";

const URL = "https://kanonufo.github.io/landing-page-ia/";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const errors = [];
const bad = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.fill("#nombre", "Prueba Publicada");
await page.waitForTimeout(300);
const estado = await page.evaluate(() => ({
  secciones: Array.from(document.querySelectorAll("main section")).map((s) => s.id),
  claves: Object.keys(localStorage).sort(),
  faq: document.querySelectorAll(".resumia-faq__pregunta").length,
  scripts: Array.from(document.scripts).map((s) => s.getAttribute("src")),
  heroOk: document.querySelector(".resumia-hero__imagen")?.naturalWidth > 0
}));
console.log(JSON.stringify({ estado, errors, bad }, null, 2));
await browser.close();
