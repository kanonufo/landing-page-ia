import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const PANDOC = "C:\\Users\\juano\\AppData\\Local\\Pandoc\\pandoc.exe";

const docs = [
  ["docs/unidad3/E30_repositorio/reflexion_repositorio.md", "docs/unidad3/E30_repositorio/reflexion_repositorio.pdf"],
  ["docs/unidad3/E30_repositorio/issues_y_project.md", "docs/unidad3/E30_repositorio/issues_y_project.pdf"],
  ["docs/unidad3/E31_auditoria/informe_auditoria.md", "docs/unidad3/E31_auditoria/informe_auditoria.pdf"],
  ["docs/unidad3/E32_persistencia/diseno_persistencia.md", "docs/unidad3/E32_persistencia/diseno_persistencia.pdf"],
  ["docs/unidad3/E32_persistencia/guion_video.md", "docs/unidad3/E32_persistencia/guion_video.pdf"],
  ["docs/unidad3/E33_sistema/sistema_diseno.md", "docs/unidad3/E33_sistema/sistema_diseno.pdf"],
  ["docs/unidad3/E34_memoria/memoria.md", "docs/unidad3/E34_memoria/memoria.pdf"],
  ["docs/unidad3/E34_memoria/guion_presentacion_literal.md", "docs/unidad3/E34_memoria/guion_presentacion_literal.pdf"],
  ["docs/unidad3/prompts_unidad3.md", "docs/unidad3/prompts_unidad3.pdf"]
];

const browser = await chromium.launch({ headless: true });

for (const [mdRel, pdfRel] of docs) {
  const md = path.resolve(mdRel);
  const pdf = path.resolve(pdfRel);
  const tmp = md.replace(/\.md$/, ".build.html");
  const cssRel = path.relative(path.dirname(md), path.resolve("docs/unidad3/doc.css")).replace(/\\/g, "/");

  const r = spawnSync(PANDOC, [md, "-f", "markdown", "-t", "html5", "--standalone", "--css=" + cssRel, "-o", tmp], {
    stdio: "inherit"
  });
  if (r.status !== 0) {
    console.error("pandoc fallo:", mdRel);
    process.exit(1);
  }

  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.pdf({
    path: pdf,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true
  });
  await page.close();
  fs.unlinkSync(tmp);
  console.log("OK", pdfRel, fs.statSync(pdf).size);
}

await browser.close();
