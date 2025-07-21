const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;

  }
  asignarRobot(robot){
    this.robot = robot;
  }
  actualizarPosicion(x, y) {
      this.robot.x = x;
      this.robot.y = y;
  }
}

class Robot {
  constructor(nombre) {
    this.nombre = nombre;
  }
}


app.get('/unirse', (req, res) => {
  const id = `${Math.random().toString(36).substring(2, 15)}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`Jugador con ID ${id} se ha unido.`);
  res.send(id);
});


app.post('/robot/:jugadorId', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const nombre = req.body.robot || '';
  const robot = new Robot(nombre);
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarRobot(robot);
  }
  console.log(jugadores);
  console.log(`Jugador con ID ${jugadorId} ha enviado un robot. ${robot.nombre}`);
  res.end();
})

app.post('/robot/:jugadorId/posicion', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
  if(jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }
  // Enviar la posición actualizada a todos los jugadores
  const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId);

  res.send({ enemigos });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
