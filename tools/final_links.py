import io

PROJECT = "https://github.com/users/kanonufo/projects/3"

# 1) Reflexion E3.0: agregar URL del Project
p = "docs/unidad3/E30_repositorio/reflexion_repositorio.md"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "**Sitio publicado:** <https://kanonufo.github.io/landing-page-ia/>",
    "**Sitio publicado:** <https://kanonufo.github.io/landing-page-ia/>\n**Tablero Kanban:** <%s>" % PROJECT,
)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 2) Issues y Project: reemplazar el parrafo desactualizado
p = "docs/unidad3/E30_repositorio/issues_y_project.md"
s = io.open(p, encoding="utf-8").read()
viejo = """El tablero se mantiene en el repositorio como registro verificable. La creación del Project (v2) en GitHub requiere el permiso `project` del token; el token disponible solo tiene `repo`, `gist`, `read:org` y `workflow`. Por eso el tablero se entrega como tabla y se deja el procedimiento para publicarlo con la cuenta propietaria:

```bash
gh auth refresh -s project,read:project
gh project create --owner kanonufo --title "ResumIA - Unidad 3"
gh project item-add <PROJECT_ID> --owner kanonufo --url <URL_DEL_ISSUE>
```"""
nuevo = """El tablero está creado y activo en <%s>, con 8 tarjetas: los Issues #1–#6 y dos borradores (envío POST y contador). Las columnas son `Por hacer`, `En progreso`, `En revisión` y `Completado`.

Para que el evaluador lo abra sin iniciar sesión y aparezca en la pestaña Projects del repositorio, deben quedar aplicados estos dos ajustes:

```bash
gh project edit 3 --owner "@me" --visibility PUBLIC
gh project link 3 --owner kanonufo --repo kanonufo/landing-page-ia
```""" % PROJECT
if viejo not in s:
    raise SystemExit("issues_y_project: bloque no encontrado")
s = s.replace(viejo, nuevo)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 3) Memoria E3.4: fila del Project
p = "docs/unidad3/E34_memoria/memoria.md"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "| Repo con 10+ commits, README y Project | Parcial: commits y README; el tablero se documenta y requiere el permiso `project` del token para publicarse por API. | `issues_y_project.md`. |",
    "| Repo con 10+ commits, README y Project | Cumple: proyecto 3 con 8 tarjetas (6 Issues + 2 borradores). | `issues_y_project.md` y <https://github.com/users/kanonufo/projects/3>. |",
)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

# 4) LEEME: pendiente del Project
p = "docs/unidad3/LEEME_ENTREGA.md"
s = io.open(p, encoding="utf-8").read()
viejo = """1. **GitHub Project (tablero Kanban).** El token de `gh` no tiene el permiso `project` y GitHub rechazó la creación por API. Ejecuta:
   ```bash
   gh auth refresh -s project,read:project
   gh project create --owner kanonufo --title "ResumIA - Unidad 3"
   ```
   Luego crea las 8 tarjetas de `issues_y_project.pdf` y vincula los Issues #1–#6."""
nuevo = """1. **GitHub Project (tablero Kanban).** Ya está creado con 8 tarjetas en <https://github.com/users/kanonufo/projects/3>. Si quieres que el evaluador lo abra sin iniciar sesión y que aparezca en el repositorio, aplica:
   ```bash
   gh project edit 3 --owner "@me" --visibility PUBLIC
   gh project link 3 --owner kanonufo --repo kanonufo/landing-page-ia
   ```
   Si ya lo hiciste, ignora este paso."""
if viejo not in s:
    raise SystemExit("LEEME: bloque no encontrado")
s = s.replace(viejo, nuevo)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)

print("ok")
