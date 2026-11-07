import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const jobs = [
  ["docs/unidad3/media/video_intro.svg", "docs/unidad3/media/video_intro.png", 1920, 1080],
  ["docs/unidad3/media/video_outro.svg", "docs/unidad3/media/video_outro.png", 1920, 1080]
];

const browser = await chromium.launch({ headless: true });
for (const [src, dst, width, height] of jobs) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(path.resolve(src)).href, { waitUntil: "load" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: dst });
  await page.close();
  console.log("OK", dst, fs.statSync(dst).size);
}
await browser.close();
