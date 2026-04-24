# Campus Quest

Este proyecto es la entrega final de la asignatura de Programación multimedia y dispositivos móviles.

La aplicación consiste en una app sencilla hecha con Ionic donde hay varias pantallas, una lista de tareas y un pequeño juego.

## Que hace la aplicacion

- Tiene una pantalla principal con el nombre del usuario.
- Se puede navegar entre distintas pantallas.
- Hay una pantalla de tareas que carga datos desde una API.
- Se puede compartir una tarea usando el boton de compartir.
- Incluye un juego simple hecho con Phaser.

En el juego:

- El jugador se mueve de izquierda a derecha.
- Caen cuadrados azules que suman puntos.
- Caen cuadrados rojos que cuentan como golpes.
- Al llegar a 3 golpes se termina la partida.
- Se puede pausar, reanudar y reiniciar el juego.
- La puntuacion se guarda en Firebase.

## Tecnologias usadas

- Ionic
- Angular
- TypeScript
- Phaser
- Firebase
- API externa (JSONPlaceholder)

## Como ejecutar el proyecto

Primero hay que instalar todo:

npm install

Luego ejecutar la app:

ionic serve

Se abrira en el navegador normalmente en localhost.

## Estructura

- home: pantalla inicial
- tasks: lista de tareas
- game: juego
- game-over: fin del juego

Tambien hay servicios para las tareas y para guardar la puntuacion.

## Notas

El proyecto es sencillo pero cumple con lo que se pide. Se ha intentado hacer todo de forma clara y sin complicar demasiado las cosas.