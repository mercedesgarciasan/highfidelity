# Onboarding — diagnóstico

**DS:** Embassy @ 51e3313 (CSS vendorizado en `vendor/embassy/`) · régimen A · plataforma nativa · tema `brand/calma.css`
**Preview:** `mockups/onboarding.preview.html` · modo: crear desde cero
**Referencia de patrón:** onboarding de una app de consumo que pasó el equipo: splash, láminas con título de dos tonos y aceptación de términos que habilita el botón, pantalla de «ya estás adentro» y una pregunta por pantalla con barra de progreso. Se toma el patrón, no la estética (es oscura y lima) ni sus ilustraciones.

## Encuadre

OBJETIVO    usuario: entrar y dejar armada su semana fija · negocio: que el socio llegue a su primera clase con horario fijo, las reglas leídas y los recordatorios activos (menos no-shows)
OBJETO      primario: el horario fijo del socio · niveles: qué gana (láminas) → quién es (nombre) → su horario → las reglas y los avisos → calendario
ACCIONES    primaria, una por pantalla: «Continuar con Google» → «Armar mi semana» → «Siguiente» → «Siguiente · 2 de 2 elegidas» → «Activar recordatorios» → «Sincronizar con Google Calendar» · secundarias: «Continuar con Apple» (btn-secondary), «Usar mi email» y «Ahora no» (btn-text)
DENSIDAD    comfortable — clientes finales, celular (DESIGN.md)
PATRÓN      onboarding-first-run: splash + carrusel de 3 láminas + login + wizard de 3 pasos en stack de pantallas (MOBILE §5: un wizard en celular nunca es un modal) + cierre opcional
DOMINANTE   láminas: el título · pasos: el campo o el grupo que se contesta · splash: la marca
RESPONSIVE  solo celular (app nativa, 390px), estructura propia; sin tab bar porque todavía no se entró a la app
ESTADOS     vacío: es el propio first-run · carga: el botón primario en `aria-busy` mientras crea la cuenta · error: `alert` de error persistente (sin conexión, calendario que no conecta) · éxito: avanza de pantalla, sin toast · deshabilitado: los botones de login hasta aceptar términos; «Siguiente» hasta elegir las clases del plan · sin permiso: avisos apagados → `alert` info, no bloquea · clase completa: fila deshabilitada con `badge-archived`

## Bloque de decisión (MOBILE.md §6c)

```
SUPERFICIE  pantalla: surface con lavado de marca (splash, láminas, cierre) · bloques: surface-container
ANCLA       no hay socio todavía: el título de dos tonos hace de ancla en láminas y pasos
GRUPOS      paso 2: «Lunes · plan de 2 por semana» · paso 3: «Si no podés ir» · cierre: la semana armada   headers afuera, caption/600/muted
FILA        screen-item: título 600 + sub 400 apagado, alto ≥ 52; en el cierre screen-row (día 400 · clase 600)
ACCIÓN      primaria: una sola por pantalla, anclada abajo fuera del scroll (screen-action)
```

## Problemas a evitar (pantalla nueva: decisiones tomadas)

1. Un carrusel largo de marketing se saltea sin leer. **Hick** y **Progressive Disclosure** → 3 láminas, una idea cada una (horario fijo, cambiar a tiempo, clase gratis), y el login vive en el pie de todas: nadie tiene que llegar a la última para entrar.
2. Un formulario de registro con todo junto agota. **carga cognitiva** y **Miller** → una pregunta por pantalla, con «1/3» y barra: **goal gradient**.
3. Las reglas aparecen cuando ya se rompieron. **Nielsen 5** (prevención de errores) → paso 3 antes de la primera clase, cada regla dura con su salida.
4. Pedir el permiso de notificaciones en frío se rechaza. **Peak-End** + **Nielsen 2** → el porqué del aviso va justo arriba del botón.
5. «Saltar» en todos los pasos (como la referencia) dejaría socios sin horario fijo, que es el producto. **Nielsen 3** aplicado al revés: libertad donde no rompe nada → sin «Saltar» en nombre y horario; «Ahora no» en avisos y calendario.
6. Tres formas de entrar del mismo peso compiten. **GOVERNANCE** §1 y **Von Restorff** → Google lleno (es el que habilita sincronizar el calendario), Apple en `btn-secondary` (obligatorio en iOS por la regla 4.8 de la App Store si se ofrece Google) y email en `btn-text`.
8. Pedir el permiso de calendario en el login asusta y baja la conversión. **Nielsen 2** y **Peak-End** (el pedido en el momento del valor) → el login con Google pide solo identidad; el permiso de calendario se pide recién en el cierre, cuando el socio ya tiene una semana para agendar.
7. El título de dos tonos usa el violeta como texto. **jerarquía visual** + WCAG → el acento mide 3,5:1, que alcanza solo para texto grande; se usa únicamente a tamaño display (32 en nativo), nunca en cuerpo.

## Movimientos

- **DIVIDIR** — registro en una pregunta por pantalla (nombre · horario · reglas) en vez de un formulario.
- **RESECUENCIAR** — el calendario pasa al final como cierre opcional («Tu semana está lista»), después de que el socio ya tiene algo que agendar.
- **AGREGAR-ESTADO** — splash, «Ya sos parte del estudio» (anticipa «son tres pasos») y paso de horario, que faltaba en la versión anterior y el prototipo sí tenía.
- **INTRODUCIR-JERARQUÍA** — un primario por pantalla; el resto en `btn-text`.
- **ELIMINAR** — «Saltar» en los pasos obligatorios; overline, índice de sección y mono (MOBILE §6d, `M15`).
- **ELIMINAR** — ilustraciones en las láminas: solo el degradé de marca (pedido del equipo). Las leyendas del marco de revisión también se sacaron: se mira como app, no como presentación.
- **REEMPLAZAR** — las reglas en párrafos por filas etiqueta/dato de una línea (`screen-row`): `screen-item` no tiene relleno vertical y con 3 líneas el texto tocaba los divisores (`M13`, **chunking**).
- **REEMPLAZAR** — la clase completa ya no lleva badge: la casilla queda deshabilitada y el detalle dice «sin lugares».

## Componentes y variantes

| Región | Componente | Por qué este |
|---|---|---|
| Lavado de fondo, foto con velo | capa `.onb-bg` a sangre detrás de la barra de estado y de los botones, con `color-mix()` de roles | No hay componente de bienvenida en el DS: gap. La barra de acciones del DS trae fondo sólido, así que en estas pantallas los botones van en `.onb-foot`, sin fondo, en vez de pisar `screen-action` (`B2`) |
| Título de dos tonos | `--font-heading` (EB Garamond) a `--font-size-display`; el `em` en `--secondary` | Momento de marca; acento solo a tamaño grande |
| Indicador de láminas | composición (`.onb-dots`) | `carousel` del DS no trae indicador: gap |
| Términos | `checkbox-label` + `checkbox` | Consentimiento explícito; habilita el login |
| Login | Google `btn-primary` · Apple `btn-secondary` · email `btn-text` | Uno lleno por contexto. En la app real, el botón de Google va con el logo oficial a color del SDK (sus pautas de marca no permiten el monocromo del mockup) |
| Progreso de pasos | `progress` lineal + «1/3» | Determinado: se sabe el total |
| Nombre | `field-group` / `field-input` / `field-hint` | |
| Días | `chip` con `aria-pressed` | Filtro de la lista, no navegación |
| Clases | `screen-item` como `label` + `checkbox` | Elección múltiple acotada al plan; la fila entera es el target |
| Clase completa | `checkbox` deshabilitado + «sin lugares» en el detalle | Lo deshabilitado ya comunica; el texto evita que sea solo color |
| Reglas | `screen-section` + `screen-group` + `screen-row` | Una línea por regla, etiqueta 400 · dato 600 |
| Por qué los avisos | `alert-info` | Explica antes del pedido, y suma viaje o enfermedad |
| Semana armada | `screen-group` + `screen-row` | Etiqueta 400, dato 600 (`M13`) |

## Vara de aceptación

`check-output`: 0 bloqueantes, 0 altas, 0 medias, con 2 excepciones declaradas (C1: un primario por teléfono; B1: clases `.onb-*` de composición). Revisado a ojo en el navegador con la marca aplicada: lavado, acento violeta, indicador de láminas y botón que se habilita al aceptar. `check-render` no corrió: falta el navegador de Playwright (`npx playwright install chromium`). Medias aceptadas: el acento violeta a 3,5:1 (solo en display), y la lámina 1, que no se puede validar en contraste hasta que la foto esté en `assets/onboarding.jpg`.

## Lo que el preview no muestra

El deslizar del carrusel, la elevación de Android, el ripple, el rebote del scroll, el teclado, el diálogo de permisos del sistema, el selector de Apple y las fuentes del dispositivo.

## Gaps del DS

- No hay pantalla de bienvenida (splash, foto con velo, lavado de marca).
- `carousel` no tiene indicador de láminas.
- El CSS pineado en `v1.2.0` usa roles `--color-*` y el repo en 51e3313 ya los renombró (`--secondary`, `--surface`…). `PUBLIC-API.md` manda a cargar `v1.2.0`, pero los tokens se exportan de HEAD: no se pueden usar juntos. Se resolvió vendorizando el CSS de 51e3313.
- `build-brand-theme.mjs` escribe el bloque oscuro con los nombres viejos (`--color-surface`). En 51e3313 no existen, así que las superficies oscuras no toman el tono de la marca.

## Cambios
- 2026-11-19 · Reglas nuevas del README (sin puntos, plazo según horario, faltas por mes, días off, calendario).
- 2026-11-19 · Fondo a sangre, sin leyendas ni ilustraciones; reglas en filas de una línea; clase completa deshabilitada sin badge.
- 2026-11-19 · Login con Google como principal, para poder sincronizar el calendario; Apple queda como segunda opción. El cierre pasa a «Sincronizar con Google Calendar», con permiso incremental.
- 2026-11-19 · Rehecho con el patrón de la referencia: splash, 3 láminas con login, bienvenida, 3 pasos con progreso, cierre con calendario. Suma el paso de horario fijo.
