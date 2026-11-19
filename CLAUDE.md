## Design System
Este proyecto usa Embassy con el tema de marca de `brand/calma.css`.
Antes de escribir cualquier UI, usá la skill `screen`. No hardcodees colores, fuentes ni radios:
todo sale de tokens (`tokens/` para la app nativa).

Lo usan los clientes finales (socios del estudio que reservan clases) · sobre todo en celular, app nativa · con su propia tab bar.
Eso define densidad, tamaños táctiles y qué patrón usa cada pantalla en pantalla chica.

El perfil del producto es densidad amplia · elevación sombra · movimiento sobrio · íconos livianos, con botones cápsula.
Ya está aplicado en el archivo de marca. No lo repitas en el CSS de las pantallas: sale de los tokens.
Tono: calma, bienestar, aire. Light mode primero. EB Garamond solo para títulos grandes y momentos de marca.

Las reglas completas están en `DESIGN.md`.
