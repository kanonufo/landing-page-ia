import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";

const jobs = [
  ["docs/unidad3/media/diagrama_arquitectura.svg", "docs/unidad3/media/pres_arquitectura.png", 1400, 900],
  ["docs/unidad3/media/diagrama_persistencia.svg", "docs/unidad3/media/pres_persistencia.png", 1400, 900],
  ["docs/unidad3/media/diagrama_sistema.svg", "docs/unidad3/media/pres_sistema.png", 1400, 900],
  ["docs/unidad3/media/diagrama_avia.svg", "docs/unidad3/media/pres_avia.png", 1400, 900]
];

const browser = await chromium.launch({ headless: true });
for (const [src, dst, width, height] of jobs) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.resolve(src)).href, { waitUntil: "load" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: dst });
  await page.close();
  console.log("OK", dst);
}
await browser.close();
