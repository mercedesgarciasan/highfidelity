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

La app resuelve sola los problemas del dueño: las reglas tienen que estar bien definidas. Del lado del estudio solo hay un tablero mínimo para ver los lugares recuperados.

- **Pago mensual.**
- **Slot reservado:** se reserva un horario fijo de antemano ("te guardamos el slot").
- **5 cambios de horario por mes.**
- **Días off según la membresía**, para viajes o vacaciones.
- **Clase gratis:** si la persona va a todas las clases que tenía pautadas en el mes, en tiempo y forma, gana una clase gratis el mes siguiente. No hay sistema de puntos.

### Reglas

El objetivo es reducir el **no-show**: la persona que no va y no avisa. Pero quien paga por mes no tiene que sentirse castigado: retener a un socio vale más que una clase llena. Por eso cada regla dura tiene una salida.

**Plazo para cambiar o cancelar, según el horario de la clase:**

- Clases de la mañana (antes de las 12): hasta las **21 h del día anterior**. Con un plazo de 6 horas, una clase de las 7:00 vencería a la 1:00 de la madrugada, y la "fiaca" aparece a las 6:30.
- Resto de las clases: hasta **6 horas antes**.

| Situación | Qué puede hacer | Consecuencia |
| --- | --- | --- |
| **Antes del plazo** | Acción principal: **Cambiar** de horario (usa 1 de los 5 cambios). También puede cancelar. | Ninguna. No cuenta como falta. |
| **Después del plazo** | Solo puede **cancelar**. | Cuenta como falta. |
| **Motivo justificado** (enfermedad) | Lo indica al avisar, o después de faltar. | Ninguna. No cuenta como falta. |
| **Viaje o vacaciones** | Se toma **días off** según su membresía. | Sus clases quedan en pausa y conserva su horario fijo. |
| **No va y no avisó** (no-show) | — | Cuenta como falta. |
| **2.ª falta** en el mes | Aviso: **"Te queda 1 falta"**. La app le pregunta "¿Querés buscar un hueco que te quede mejor?" y le muestra los horarios disponibles. | — |
| **3.ª falta** en el mes | Puede reservar clases sueltas. | Pierde su lugar en el mes. Lo **recupera yendo a 3 clases** sin faltar. |

Una falta es faltar sin avisar o cancelar después del plazo. Cualquier falta hace perder la clase gratis de ese mes.

**Primer uso:** antes de empezar, la app muestra estas reglas, explica por qué importan los recordatorios (cancelar a tiempo evita perder el lugar y libera horarios para otros), pide activarlos y ofrece sumar las clases al calendario.

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

**Flujo 1 — Happy path:** el usuario no cancela, hace todo bien y gana una clase gratis.

1. El usuario se loguea.
2. Ve los horarios disponibles.
3. Selecciona sus horarios según su membresía.
4. Pantalla "Gestioná tus cambios con tiempo": ve las reglas, por qué importan los recordatorios, y los activa.
5. Agrega sus clases al calendario (Google, Apple u Outlook).
6. Recibe un reminder: "¿Vas a asistir a la clase? Confirmá tu asistencia."
7. Concurre a clase (el back registra que fue).
8. Si fue a todas sus clases del mes, gana una clase gratis el mes siguiente.

### Parte 2: no puedo ir

Estos flujos salen del paso 3 del happy path: el usuario ya tiene sus horarios elegidos.

**Flujo 2 — Avisa antes del plazo: cambia de horario.**

1. El usuario indica que no puede ir, antes del plazo.
2. La acción principal es **Cambiar**: le mostramos los horarios disponibles y cuántos cambios le quedan en el mes.
3. Elige otro horario. Si prefiere, también puede cancelar sin consecuencias.

**Flujo 3 — Avisa después del plazo: solo puede cancelar.**

1. El usuario indica que no puede ir, después del plazo.
2. Solo puede cancelar. Le mostramos que cuenta como falta y cuántas lleva en el mes.

**Flujo 4 — No va y no avisa (no-show).**

1. El usuario no va a clase y no avisó (por el back sabemos que no fue).
2. Si es la 2.ª vez en el mes, le avisamos "Te queda 1 falta" y le preguntamos: "¿Querés buscar un hueco que te quede mejor?". Le mostramos los horarios disponibles.
3. Si es la 3.ª vez en el mes, liberamos su horario fijo. Puede reservar las clases sueltas que queden disponibles.
4. Si va a 3 clases sin faltar, recupera su horario fijo.

**Flujo 5 — Tiene un motivo justificado.**

1. El usuario avisa que no puede ir, o ya faltó.
2. Elige "Tengo un motivo": enfermedad.
3. La clase queda justificada: no cuenta como falta.

**Flujo 6 — Se toma días off.**

1. Entra a Días off, o elige "Me voy de viaje" al avisar que no puede ir.
2. Elige los días, según los que le quedan de su membresía.
3. Sus clases quedan en pausa y conserva su horario fijo.

## Artefacto

Prototipo funcional, sobre todo del lado del **socio** (la persona que va a entrenar). Está en [prototipo/index.html](prototipo/index.html): es un solo archivo HTML y se abre directo en el navegador.

### Circuito de la demo

Para la hackathon, el alcance se recorta a un solo circuito completo, que se cuenta de punta a punta:

1. **Recordatorio antes de que cierre el plazo.** Sofi recibe el aviso para su clase del lunes 8:00.
2. **La persona confirma o libera el lugar.** Toca "Voy", o "No puedo" y cambia o cancela.
3. **La lista de espera lo ocupa.** Lu, primera en la lista, recibe "¡Se liberó un lugar!" y lo toma. Si lo deja pasar, se ofrece a la siguiente persona.
4. **El dueño ve el lugar recuperado en su tablero.** La clase vuelve a 12/12 con "1 lugar recuperado", y la actividad muestra qué pasó.

En el prototipo, unas pestañas arriba del teléfono cambian entre las tres vistas: Sofi (socia), Lu (lista de espera) y Estudio (dueño). El tablero del dueño es mínimo: solo existe para cerrar el circuito.

### Alcance del prototipo

- **Pantallas de la socia:** login, elegir horario fijo, reglas y recordatorios, agregar al calendario, inicio (próxima clase, clases del mes, cambios, faltas, clase gratis, días off), cambiar de horario, cancelar, motivo justificado, días off, avisos de falta, lugar perdido, clases sueltas y horario recuperado.
- **Lista de espera y tablero del estudio:** solo lo necesario para el circuito.
- **Datos hardcodeados:** sin backend ni login real.
- **Panel de demo:** botones para simular el momento de la clase (antes del plazo, pasó el plazo, ya fue), si fue o faltó, y arrancar cada flujo sin esperar. Incluye un selector de color para probar la marca de distintos estudios.
- **Fuera de alcance:** pagos, sync con Google Calendar, multas en $, catálogo de canjes de puntos.

### Valores que usa el prototipo (a definir)

- Cambiar, cancelar antes del plazo, motivos justificados y días off no hacen perder la clase gratis.
- Hasta 2 motivos justificados por mes. El estudio puede pedir un comprobante.
- 7 días off por trimestre en el plan de 2 clases por semana.
- Con los 5 cambios usados y antes del plazo, solo puede cancelar, sin que cuente como falta.
- Cambiar el horario fijo después de la 2.ª falta no usa los cambios del mes.
- El lugar liberado se ofrece a la primera persona de la lista de espera, que tiene 30 minutos para tomarlo. Si no lo toma, pasa a la siguiente.

## Fuente

Toda la discovery vive en el board de FigJam: [High Fidelity](https://www.figma.com/board/LytyIrMNtCgrFZYsgM1xJN/High-Fidelity).

## Cómo empezar

```bash
git clone https://github.com/amalgamaco/highfidelity_hackaton.git
cd highfidelity_hackaton
```

_Agregá acá los pasos para instalar dependencias y correr el proyecto._
