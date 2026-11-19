# Prototipo → Embassy — plan de migración

**DS:** Embassy @ 51e3313 · régimen A · tema `brand/calma.css` · modo: migrar
**Origen:** `prototipo/index.html` (un solo HTML: teléfono con la app del socio + panel lateral de demo, ~20 pantallas renderizadas con JS)
**Estado:** propuesta. No se tocó el prototipo. Se ejecuta después de confirmar.

## Encuadre

OBJETIVO    usuario: cuidar su horario fijo (confirmar, cambiar a tiempo, avisar un motivo) · negocio: menos no-shows sin que el socio se sienta castigado
OBJETO      primario: la próxima clase del socio · niveles: próxima clase → horario fijo de la semana → clase gratis / faltas → días off
ACCIONES    primaria en Inicio: «Confirmar que voy» · secundarias: «No puedo ir» (btn-secondary), «Tengo un motivo» (btn-text)
DENSIDAD    comfortable — clientes finales, celular (DESIGN.md)
PATRÓN      app nativa en stack + sheets; Inicio = entity-detail con ancla (MOBILE §6b·5); cambio de horario = selección en lista; resultados = pantalla de confirmación
DOMINANTE   Inicio: la tarjeta de la próxima clase
RESPONSIVE  el teléfono va en `.phone[data-platform="native"]` a 390px; el panel lateral es web de escritorio y sigue a `.column`, apilado en pantalla chica
ESTADOS     vacío: «No tenés clases reservadas» → clases sueltas · carga: skeleton de la tarjeta · error: alert persistente · éxito: snackbar (hoy `.toast`) · deshabilitado: «Elegiste 1 de 2» · sin permiso: avisos apagados → alert info

## Capa 1 — Tokens (mecánico, sin riesgo de UX)

Se borra el bloque `:root` del prototipo y se cargan las hojas de Embassy + `brand/calma.css`.

| Prototipo | Embassy | Nota |
|---|---|---|
| `--a-bg` #F5F6F8 | `--surface` | |
| `--a-card` #FFF | `--surface-container` (vía `.screen-group`) | |
| `--a-fg` | `--on-surface` | navy de marca, no negro |
| `--a-muted` | `--on-surface-variant` | |
| `--a-line` | `--outline-variant` | |
| `--brand` | `--primary` (botón lleno) · `--secondary` (selección, foco) | hoy un solo color hace las dos cosas |
| `--good` / `--warn` / `--bad` + sus fondos hex | cuartetos `--success-*` / `--warning-*` / `--error-*` | desaparecen 11 hex sueltos |
| Space Grotesk (`--font-display`) | `--font-heading` (EB Garamond) | también en horarios y números |
| 14px de cuerpo, tamaños sueltos (11, 11.5, 12.5…) | escala `native`: body-md 16, label 15, caption 13 | `M1`/`M5`: hoy el cuerpo es de escritorio |
| radios 10/12/14/18/26 sueltos | `--radius-*`, `--screen-radius`, `--radius-button` cápsula | |
| `@keyframes up/drop` con `.22s ease-out` | `motion:` del sheet y del snackbar + `--duration-*` / `--ease-*` | no se inventa movimiento |
| dark mode a mano (`:root[data-theme="dark"]`) | se borra: viene de Embassy | regla: nada de overrides por tema |

**White-label:** el prototipo cambia `--brand` con 4 muestras (Azul, Verde, Naranja, Negro). En Embassy cada muestra es un archivo `brand/<cliente>.css` generado con el script, y el selector de la demo cambia qué hoja está cargada. Así cada marca cambia el color y también los contrastes y el oscuro, ya verificados.

## Capa 2 — Componentes

| Prototipo | Embassy | Por qué |
|---|---|---|
| `.phone` / `.screen` / `.statusbar` | `.phone[data-platform="native"]` / `.phone-screen` / `.phone-status` | los tokens resuelven a valores de teléfono |
| `.topbar` + `.back` | `.phone-nav` | |
| `.btn.primary` / `.secondary` / `.ghost` / `.danger` | `btn-primary` / `btn-secondary` / `btn-text` / `btn-primary btn-danger` | |
| `.link` | `btn-link` | |
| `.mini` («Tomarme días») | `screen-inline-action` | acción secundaria en línea, 36 dibujado / 48 táctil (MOBILE §6b·4b) |
| `.pill` de estado | `badge`: Reservada → `badge-info` · Confirmada / Fuiste → `badge-open` · Faltaste → `badge-closed` · Cancelada / Justificada → `badge-archived` · Días off → `badge-tertiary` · Venció el plazo → `badge-warning` | estado siempre en badge, con texto |
| `.card` + `.a-label` adentro | `screen-section-header` **afuera** + `screen-group` | `M12`, el defecto más repetido del prototipo |
| `.week-row` | `screen-row` (día = etiqueta 400, hora = dato 600) | `M13` |
| `.slot` seleccionable + `.check` | `screen-item` con `aria-pressed` / radio | la selección la declara el atributo |
| `.days` / `.day.on` (filtro por día) | `chip` con `aria-pressed` | filtro, no navegación |
| `.daygrid` / `.dchip` (elegir días off) | `calendar` en modo rango/múltiple | confirmar contra `component-rules/calendar.md` |
| `.bar` | `progress` | |
| `.strikes` (3 segmentos rojos) / `.dots-row` (8 círculos del mes) | `progress` + cifra («2 de 3 faltas», «6 de 8 clases») | no existe en el DS un progreso por segmentos: gap |
| `.stat` | `screen-item-figure` (nativo) | |
| `.banner` / `.banner.warn` | `alert-error` / `alert-warning` | hay que actuar, así que alert y no snackbar |
| `.card.tint` (explicaciones) | `alert-info` | |
| `.field` | `field-group` / `field-label` / `field-input` | |
| `.toggle-row` + `.sw` | `screen-row` + `switch` dentro de `switch-label` | |
| `.dim` + `.sheet` | `sheet` (bottom sheet) | movimiento `--ease-emphasized` / `--duration-sheet` |
| `.toast` | `snackbar` | |
| `.push` / `.lock` | **se quedan**: simulan el sistema operativo, no son producto | |
| `.logo` «LOGO» | wordmark `calma.` en `--font-heading` | |
| Panel lateral: `.box`, `.flow`, `.seg`, `.pbtn`, `.tag`, `.personas` | web: `card`, `seg-btn-group`, `btn-secondary btn-sm`, `badge`, en `.column` | es herramienta de demo, va con escala de escritorio |

## Capa 3 — UX: lo que cambia de lugar

1. **Inicio no tiene ancla.** Abre con un logo y «Hola, Sofi», y lo que más motiva (la clase gratis) queda al final. Rompe la **jerarquía visual** (MOBILE §6b·5). → **MOVER** la clase gratis («6 de 8 clases») al bloque ancla de arriba, con avatar y estado.
2. **Las etiquetas de sección van adentro de las tarjetas**, en mayúsculas de 11px. Rompe **chunking** y `M12`. → **MOVER** los headers afuera del grupo.
3. **«Confirmar que voy» vive dentro de la tarjeta**, en el medio del scroll. Rompe **Fitts** y `M14`. → **MOVER** a `screen-action`, anclado abajo. «No puedo ir» queda como secundario.
4. **Las reglas del primer uso (pantalla «Gestioná…») tienen una fila llena de color que parece botón y no lo es**, encima del botón real. Rompe **Von Restorff** y la adyacencia (**GOVERNANCE** §1). → **ELIMINAR** esa fila. Su texto pasa al porqué de los avisos.
5. **En la misma pantalla, dos switches y además el botón «Activar recordatorios»** hacen lo mismo de dos maneras. Rompe **Nielsen 4** (consistencia). → **UNIFICAR**: el botón activa los dos; los switches quedan para Perfil.
6. **Los días del cambio de horario se pintan en negro lleno**, el mismo peso que un botón primario. Rompe **COMPOSICION §4c**: un filtro va a medio peso. → **REEMPLAZAR** por chips con `--secondary-container`.
7. **Las pantallas de resultado usan un cuadrado de color con un símbolo** (✓, !) como ícono. Rompe la **jerarquía visual** (`H8`, el ícono en cuadradito). → **REEMPLAZAR** por título + `screen-group` con lo que cambió, y el estado en `badge`.
8. **Faltas y clase gratis se leen solo por color** (segmentos rojos, círculos verdes). Rompe **Nielsen 1** y WCAG (estado nunca solo por color). → **AGREGAR-ESTADO**: cifra en texto junto a cada barra.
9. **El calendario privilegia Google con el primario** y deja Apple y Outlook en secundarios. Es razonable (**Hick**: una opción por defecto). Se conserva.

## Choque con el onboarding que ya armé

El prototipo tiene un paso que mi onboarding no tiene: **«Elegí tu horario fijo»**, entre el login y las reglas. Es el paso 3 del flujo 1 del README, así que el prototipo tiene razón. Propuesta: el flujo queda **login (con la foto de fondo) → elegí tu horario → gestioná tus cambios → calendario**, y `mockups/onboarding.preview.html` se actualiza a esos cuatro pasos.

## Gaps del DS

- No hay progreso por segmentos (faltas 1-2-3, asistencias del mes).
- No hay pantalla de bienvenida con foto (ya anotado en `design/onboarding.md`).
- No hay pantalla de resultado o confirmación nativa.

## Orden propuesto

- Paso 1 · Capa 1 (tokens + hojas) y la cabecera del teléfono. Se ve el cambio de marca en todo.
- Paso 2 · Capa 2 en Inicio y en el primer uso (login, horario, reglas, calendario).
- Paso 3 · Capa 3 en esas mismas pantallas.
- Paso 4 · El resto de las pantallas (cambio, cancelación, faltas, días off, clases sueltas, perfil, tablero del dueño).
- Paso 5 · Panel lateral.

## Vara de aceptación

Se corre `check-output` y `check-render` sobre el prototipo al terminar cada paso. Para cerrar: cero ALTAS y hasta dos MEDIAS anotadas acá.
