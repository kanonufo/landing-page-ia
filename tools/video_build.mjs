import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const WORK = path.resolve("docs/unidad3/video_tmp");
const OUTDIR = path.resolve("docs/unidad3/E32_persistencia");
const FFMPEG = "C:\\Users\\juano\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe";

const cap = JSON.parse(fs.readFileSync(path.join(WORK, "captura.json"), "utf8"));
const frames = cap.frames;

const ts0 = frames[0].ts;
const tsN = frames[frames.length - 1].ts;
const inicioSeg = cap.inicio / 1000;

const INTRO = 4;
const OUTRO = 5;
const STILL = 7;
const TARGET = 130;

function srtTime(seg) {
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = Math.floor(seg % 60);
  const ms = Math.round((seg - Math.floor(seg)) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

let durations = [];
for (let i = 0; i < frames.length; i++) {
  const d = i < frames.length - 1 ? frames[i + 1].ts - frames[i].ts : 1.0;
  durations.push(Math.min(12, Math.max(0.05, d)));
}
const suma = durations.reduce((a, b) => a + b, 0);
const factor = Math.max(1, (TARGET - INTRO - OUTRO) / suma);
const framesTotal = suma * factor;
const total = INTRO + framesTotal + STILL + OUTRO;

const lineas = [];
lineas.push(`file '${path.join(WORK, "..", "media", "video_intro.jpg").replace(/\\/g, "/")}'`);
lineas.push(`duration ${INTRO.toFixed(3)}`);
frames.forEach((f, i) => {
  lineas.push(`file '${f.archivo.replace(/\\/g, "/")}'`);
  lineas.push(`duration ${(durations[i] * factor).toFixed(4)}`);
});
lineas.push(`file '${path.join(WORK, "..", "media", "evidencia_network.jpg").replace(/\\/g, "/")}'`);
lineas.push(`duration ${STILL.toFixed(3)}`);
lineas.push(`file '${path.join(WORK, "..", "media", "video_outro.jpg").replace(/\\/g, "/")}'`);
lineas.push(`duration ${OUTRO.toFixed(3)}`);
lineas.push(`file '${path.join(WORK, "..", "media", "video_outro.jpg").replace(/\\/g, "/")}'`);
fs.writeFileSync(path.join(WORK, "lista.txt"), lineas.join("\n") + "\n", "utf8");

const mapa = (t) => INTRO + (inicioSeg + t - ts0) * factor;

const subs = [];
subs.push({ a: 0.3, b: INTRO - 0.3, t: "ResumIA - Demostración del módulo de persistencia (E3.2)" });
cap.fases.forEach((f, i) => {
  const a = Math.max(INTRO + 0.3, mapa(f.start));
  const b = i < cap.fases.length - 1 ? Math.min(INTRO + framesTotal - 0.3, mapa(cap.fases[i + 1].start) - 0.2) : INTRO + framesTotal - 0.3;
  subs.push({ a, b, t: f.texto });
});
subs.push({ a: INTRO + framesTotal + 0.3, b: INTRO + framesTotal + STILL - 0.3, t: "El POST llega al servicio externo y responde 200" });
subs.push({ a: INTRO + framesTotal + STILL + 0.5, b: total - 0.5, t: "github.com/kanonufo/landing-page-ia" });

let srt = "";
subs.forEach((s, i) => {
  srt += `${i + 1}\n${srtTime(s.a)} --> ${srtTime(s.b)}\n${s.t}\n\n`;
});
const srtPath = path.join(OUTDIR, "demo_persistencia.srt");
fs.writeFileSync(srtPath, srt, "utf8");

const out = path.join(OUTDIR, "demo_persistencia.mp4");
const filtro = "fps=30,scale=1920:1080:flags=lanczos,format=yuv420p,subtitles=demo_persistencia.srt:force_style='FontName=Arial,FontSize=9,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=1,MarginV=18'";

const args = [
  "-y", "-f", "concat", "-safe", "0", "-i", path.join(WORK, "lista.txt"),
  "-vf", filtro,
  "-c:v", "libx264", "-crf", "21", "-preset", "veryfast",
  "-movflags", "+faststart", out
];

console.log("factor:", factor.toFixed(3), "duracion total:", total.toFixed(1), "s", "frames:", frames.length);
const r = spawnSync(FFMPEG, args, { stdio: "inherit", cwd: OUTDIR });
if (r.status !== 0) {
  console.error("ffmpeg fallo con codigo", r.status);
  process.exit(1);
}
console.log("OK", out, fs.statSync(out).size);
