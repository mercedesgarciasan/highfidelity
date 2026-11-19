# Design — App de reservas de clases (High Fidelity)

**Design System:** Embassy (`amalgamaco/amalgama-design-system`) @ 51e3313 · CSS vendorizado en `vendor/embassy/` (no el tag `v1.2.0` del CDN: usa otros nombres de rol, ver Pendientes)
**Plataforma:** app nativa (se baja de la tienda). Stack **todavía no decidido**: hay tokens para Flutter y React Native. Escala `native`/`nativeDark`, target 48, sin app shell, y vale `MOBILE.md`.
**Tema de marca:** `brand/calma.css` + `brand/calma.screen.css` (ajuste de la capa de pantalla, MOBILE §6e) (slug provisorio, se renombra cuando el estudio tenga nombre) — primary #A2CAFF (celeste → rampa navy, texto #001C3F) · secondary #A88BFA (lavanda/violeta, acento #9173E0) · radio `pildora`
**Tipografía:** EB Garamond (títulos y momentos de marca) · Inter (todo lo demás). Ambas libres (OFL) en Google Fonts · **Idioma de UI:** español rioplatense
**Modo:** se diseña y aprueba en claro. El oscuro viene generado y verificado, sin trabajo extra.
**Estructura de pantalla:** tab bar + stack (Inicio · Horarios · Mi mes · Perfil). Ancla arriba, grupos en tarjeta, acción primaria anclada abajo (`MOBILE.md` §6b).
**Personalidad:** densidad `amplia` · elevación `sombra` · movimiento `sobrio` · íconos `liviano`

## Para quién y dónde
**Lo usa:** clientes finales (socios del estudio boutique que reservan clases). El panel de coaches/dueño es otra etapa.
**Sobre todo en:** celular — targets ≥48px, 8px entre targets.
**Vive:** app propia con su tab bar.

> Estas tres deciden densidad, tamaños, patrón responsive y tono. `screen` las lee antes de
> diseñar cada pantalla: si cambian, cambialas acá.

## Cómo se trabaja acá
- Pantallas nuevas o rediseños → `/embassy:screen`
- Entregables de una vez (propuestas, reportes) → `/embassy:artifact`
- Antes de entregar o mergear → `/embassy:review`

## Reglas que no se negocian
- Solo tokens. Cero hex crudos, cero px de tipografía sueltos, cero familias entre comillas.
- Solo primitivas en `brand/`. Nunca roles semánticos, nunca overrides por tema.
- Un solo `btn-primary` por contexto.
- Las clases salen de `PUBLIC-API.md`. Componente que falta se marca, no se inventa.
- Los tamaños salen de `native`/`nativeDark`. Un número escrito a mano es `M1`.
- Todo lo tocable mide 48 o más, con 8px entre targets. Menos es `M2`, bloqueante.
- `useSafeAreaInsets()` siempre (o `SafeArea` en Flutter). Un `paddingTop` fijo es `M3`.
- Nada de patrones de escritorio encogidos: el mapa está en `MOBILE.md` §5. Es `M4`.
- `tokens/` es generado. Se regenera, no se edita. `build-tokens.mjs --check` en CI.
- EB Garamond solo en títulos grandes, onboarding y momentos de marca. Nunca en botones, filas ni datos.
- **Todas las tarjetas de una pantalla son iguales:** relleno `--screen-group-padding` (16), radio `--screen-radius` (24), a `--screen-gutter` (20) del borde, alineadas con los botones. El ancla usa el mismo relleno (`brand/calma.screen.css`).
- Dentro de una pantalla, solo hay tarjetas de grupo (`screen-group`) y el ancla. Una explicación va como nota debajo del grupo, no como `alert`. Las `alert` se reservan para estados (error, sin conexión, faltas).
- Un solo margen lateral: nunca `.screen` dentro de `.phone-screen` (duplica el gutter a 40).

## Decisiones tomadas
- **Celeste como primary, lavanda como secondary.** El celeste puro (#A2CAFF) no aguanta texto blanco, así que el sistema lo lleva a navy (#001C3F) para texto y botón primario, y lo usa claro en superficies (`primary-container` #D6E1EE). La lavanda va en contenedores (#DAD4F5) y el violeta (#9173E0) en lo activo y el foco. Rosa descartado a pedido.
- **Botones cápsula** en todos lados: suave, de bienestar. Por eso sombra difusa e íconos finos, no borde nítido.
- **Densidad amplia** aunque sea celular: el pedido explícito es "con aires" y es un producto de público, no una herramienta densa.
- **Movimiento sobrio** en vez de expresivo: el rebote no transmite calma.
- **Botón cápsula también en nativo:** el DS declara `--radius-button: 14px` para la plataforma nativa. La marca lo pisa en CSS porque carga después, pero el exportador de tokens no lo hacía, así que en los tokens exportados se fijó en 9999px.
- **Tokens exportados con la marca:** `build-tokens.mjs` lee solo `css/variables.css` del DS. Para exportar la marca, se mezcló `brand/calma.css` en una copia del DS y se exportó desde ahí. Ver Pendientes.
- **Referencias visuales:** brand guideline "Botanic AI" (inspiración de clima: degradés celeste→lavanda, mucho blanco, serif + sans). No se copia su logo ni su identidad.

## Imágenes
- **Fondo del onboarding:** foto de espalda en postura de yoga sobre pared de hormigón claro. Va en `assets/onboarding.jpg`.
  Tiene tonos cálidos (terracota), que contrastan con la paleta fría. Para que se lea como parte de la marca y el texto tenga contraste, lleva un velo de abajo hacia arriba: `--surface` → `--primary-container` → `--secondary-container` → transparente. El título en EB Garamond `--on-surface` va **abajo**, sobre la pared clara y velada. Arriba a la izquierda la foto es negra (el pantalón), así que ahí no va texto.

## Registro de pantallas
- Onboarding (splash · 3 láminas con login · bienvenida · nombre · horario fijo · reglas y avisos · calendario) → `design/onboarding.md` · preview `mockups/onboarding.preview.html`
- Migración del prototipo (plan, sin ejecutar) → `design/prototipo-migracion.md`

## Pendientes
- **Nombre y logo del estudio:** `calma` es un nombre provisorio. Regenerar el tema con el slug real lleva dos minutos.
- **Stack nativo:** Flutter o React Native. Los tokens están para los dos (`tokens/embassy_tokens.dart`, `tokens/embassy.tokens.ts`).
- **Gap del DS a reportar:** `build-tokens.mjs` no acepta un archivo de marca. Hubo que mezclarlo a mano y fijar `--radius-button` nativo. Mientras no se corrija, `--check` del DS no cubre los tokens de este proyecto: si se regenera la marca, repetir la mezcla.
- **Gap del DS: CSS del CDN vs. repo.** `PUBLIC-API.md` manda a cargar `@v1.2.0`, que usa `--color-*`; el repo en 51e3313 usa `--secondary`, `--surface`… y de ahí salen los tokens. Se vendorizó el CSS de 51e3313. Reportar al DS.
- **Gap del DS: oscuro de marca.** `build-brand-theme.mjs` escribe el bloque `[data-theme="dark"]` con `--color-surface…`, nombres que en 51e3313 no existen: las superficies oscuras quedan con el navy de Embassy. No se parcheó a mano (archivo generado). Reportar al DS.
- **Gap del DS: doble gutter en el preview nativo.** `.phone-screen` y `.screen` ponen cada uno `--screen-gutter`; anidados (como en `demos/native-screen.html`) el contenido queda a 40 y la acción anclada a 20. Reportar.
- **Imagen del onboarding:** copiarla a `assets/onboarding.jpg`. No llegó como archivo.
- **Verificación visual del oscuro:** pendiente de mirar en el navegador. Los contrastes del script pasan AA en claro y en oscuro.
