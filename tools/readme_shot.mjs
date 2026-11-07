import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:8788/index.html", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: "docs/unidad3/capturas/readme_preview.png" });
await browser.close();
console.log("ok");
