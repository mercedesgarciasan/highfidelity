# Inicio — directorio del proyecto

Pantalla nueva, web estática (`index.html` en la raíz). No es parte de la app de socios: es la puerta de entrada para el equipo y los jurados de la hackathon.

## Marco
GOAL       user: encontrar y abrir una pieza del proyecto        business: que quien llega vea el producto primero
OBJECT     primary: la lista de piezas                           tiers: producto (app, admin) → flujos y reglas → diseño
ACTIONS    primary: ninguna (cada fila es un enlace)             secondary: —
PATTERN    archetype: list-collection (hub de navegación)        key components: `item item-outline` como `<a>`, `item-group`, `overline`
RESPONSIVE desktop: una columna `column-read` (800)              mobile: la misma columna, filas a todo el ancho con el gutter del DS
STATES     contenido estático: sin carga, vacío ni error. Si falta un destino, el 404 es del servidor.

## Problemas y movimientos
- No había página de inicio: la raíz daba 404 o un listado de carpetas (Nielsen 1, visibilidad) → ADD-STATE: directorio.
- Seis piezas sueltas sin orden (Miller, chunking) → GROUP en tres grupos por propósito, producto primero (jerarquía).
- Descripciones en lenguaje del socio y del dueño, no nombres de archivo (Nielsen 2) → REPLACE de títulos de archivo por nombres de tarea.

## Componentes
- `item` como `<a>` (`a.item` es la variante clicable del DS): fila con ícono, título, descripción y chevron. Elegido sobre `card` porque son ítems intercambiables de una colección, no paneles; sobre `list` porque necesita ícono y acción.
- `overline` para los encabezados de grupo y el sobretítulo.
- Título en EB Garamond (`--font-heading`) a tamaño display: es un momento de marca.

## Excepciones
- `.dir-*`: espaciado entre grupos y filas con tokens `--space-*`; el DS no tiene gap en `item-group`.
