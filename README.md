# High Fidelity Hackathon

Repositorio del equipo de Amalgama para la hackathon **High Fidelity**.

> **Pregunta guía:** ¿Cómo reducimos el % de cancelaciones y no-shows en las clases grupales?

## El problema: reservan la clase y no vienen

**Quién lo sufre:** el dueño de un estudio boutique (y sus coaches).

La clase figura llena, pero en la práctica quedan lugares vacíos. El instructor cobra igual, el estudio pierde ingresos y otro socio se quedó afuera.

**Por qué es real:** la industria maneja tasas de ausencia del 10% al 30% en clases regulares y del 20% al 40% en clases de prueba (dato de [Glofox](https://www.glofox.com/), proveedor de software que no cita el estudio de origen).

### Impacto

- **No se optimiza el cupo:** gente que podría venir no viene.
- **Clases vacías:** baja la motivación de los socios para lo grupal.
- **Desmotivación del coach.**
- **Sin continuidad no hay personalización:** si la gente no viene seguido, el coach no puede personalizar la clase ni profundizar en el progreso de cada persona.

### ¿Por qué la gente no va?

- "No llego."
- "Tengo otro plan."
- "El horario es temprano y me da fiaca."

## Cómo funciona la app

- **Pago mensual.**
- **Slot reservado:** se reserva un horario fijo de antemano ("te guardamos el slot").
- **5 modificaciones por mes.**
- **Cancelación hasta 6 horas antes.** Si cancelás 3 veces seguidas, perdés tu slot.

## Ideas (brainstorming)

### Rewards

- El % de asistencias completadas se traduce en puntos canjeables por beneficios: clases, invitar a alguien, planes, etc.

### Trigger actions

- **Basadas en acciones:** ofrecer mejores horarios si la persona cancela dos veces.
- **Lista de espera** en los horarios que quiero.

### Penalidades

- Fee o bloqueo por no-show.
- Si cancelás 3 veces seguidas perdés tu slot y tenés que volver a esperar para recuperar tu lugar.
- Baja tu scoring si no vas a clase.

### Visibilidad

- Seguimiento de los profes para ver quién viene y quién no, con notificaciones ("Vicky te espera hoy a las…") y confirmación de asistencia.
- Bloques en la agenda con sync a Google Calendar.
- Saber cuántos cambios de horario me quedan en el mes.
- **Lugar fijo:** tenés tu día y horario fijo; esa plaza es tuya, pero si faltás 3 veces seguidas la perdés.
- **5 cambios por mes** con tiempo de antelación, viendo los lugares disponibles en una vista tipo calendario.
- Ver el % de cancelaciones.

**Pain detectado:** hoy es difícil cambiar el horario y enterarse con antelación de que se liberó un lugar para poder usarlo.

## Task flow

### Parte 1: me inscribo y me comprometo

**Flujo 1 — Happy path:** el usuario no cancela, hace todo bien y suma puntos.

1. El usuario se loguea.
2. Ve los horarios disponibles.
3. Selecciona sus horarios según su membresía.
4. Habilita recordatorios.
5. Recibe un reminder: "¿Vas a asistir a la clase? Confirmá tu asistencia."
6. Concurre a clase (el back registra que fue).
7. Suma puntos por asistir a tiempo.

### Parte 2: cancelaciones

**Flujo 2 — Cancela a tiempo, sin consecuencias.**

1. El usuario cancela con más de 6 horas de antelación, más de una vez en el mismo mes.
2. Le preguntamos: "¿Necesitás cambiar de horario?"
3. Le mostramos los horarios disponibles.

**Flujo 3 — Cancela fuera del plazo permitido.**

1. El usuario cancela con menos de 6 horas de antelación, más de una vez en el mismo mes.
2. Le mostramos que bajó su puntaje, que tiene que esperar para recuperar su horario y que puede agendar manualmente las clases sueltas que queden disponibles.

## Artefacto

_En definición. Ver el board de FigJam._

## Fuente

Toda la discovery vive en el board de FigJam: [High Fidelity](https://www.figma.com/board/LytyIrMNtCgrFZYsgM1xJN/High-Fidelity).

## Cómo empezar

```bash
git clone https://github.com/amalgamaco/highfidelity_hackaton.git
cd highfidelity_hackaton
```

_Agregá acá los pasos para instalar dependencias y correr el proyecto._
