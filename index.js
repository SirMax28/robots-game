const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const jugadores = [];
let ultimaActividad = {}; // Para tracking de actividad

// Limpiar jugadores inactivos cada 30 segundos
setInterval(() => {
  const ahora = Date.now();
  const TIEMPO_INACTIVIDAD = 60000; // 1 minuto sin actividad
  
  for (let i = jugadores.length - 1; i >= 0; i--) {
    const jugadorId = jugadores[i].id;
    const ultimaVez = ultimaActividad[jugadorId] || 0;
    
    if (ahora - ultimaVez > TIEMPO_INACTIVIDAD) {
      console.log(`Eliminando jugador inactivo: ${jugadorId}`);
      jugadores.splice(i, 1);
      delete ultimaActividad[jugadorId];
    }
  }
  
  console.log(`Jugadores activos: ${jugadores.length}/2`);
}, 30000); // Cada 30 segundos

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
  asignarAtaques(ataques) {
    this.robot.ataques = ataques;
  }
}

class RobotCombate {
  constructor(nombre) {
    this.nombre = nombre;
  }
}


app.get('/unirse', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Limitar a máximo 2 jugadores
  if (jugadores.length >= 2) {
    console.log('Sala llena. Se rechazó la conexión.');
    res.status(400).send('Sala llena. Máximo 2 jugadores permitidos.');
    return;
  }
  
  const id = `${Math.random().toString(36).substring(2, 15)}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  
  // Marcar actividad inicial
  ultimaActividad[id] = Date.now();
  
  console.log(`Jugador con ID ${id} se ha unido. Jugadores activos: ${jugadores.length}/2`);
  res.send(id);
});


app.post('/robot/:jugadorId', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const nombre = req.body.robot || '';
  const robot = new RobotCombate(nombre);
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarRobot(robot);
    
    // Inicializar posición del robot con límites fijos del canvas
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 400;
    const ROBOT_SIZE = 50;
    
    if (!jugadores[jugadorIndex].robot.x) {
      jugadores[jugadorIndex].robot.x = Math.floor(Math.random() * (CANVAS_WIDTH - ROBOT_SIZE));
      jugadores[jugadorIndex].robot.y = Math.floor(Math.random() * (CANVAS_HEIGHT - ROBOT_SIZE));
    }
    
    // Marcar actividad
    ultimaActividad[jugadorId] = Date.now();
  }
  console.log(`Jugador con ID ${jugadorId} ha enviado un robot: ${robot.nombre}`);
  console.log(`Total jugadores con robots: ${jugadores.filter(j => j.robot).length}`);
  res.end();
})

app.post('/robot/:jugadorId/posicion', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
  
  // Marcar actividad del jugador
  ultimaActividad[jugadorId] = Date.now();
  
  if(jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }
  
  // Enviar solo enemigos que tengan robot asignado y posición válida
  const enemigos = jugadores.filter((jugador) => 
    jugador.id !== jugadorId && 
    jugador.robot && 
    jugador.robot.nombre && 
    typeof jugador.robot.x === 'number' && 
    typeof jugador.robot.y === 'number'
  );

  res.send({ enemigos });
})

app.post('/robot/:jugadorId/ataques', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const ataques = req.body.ataques || [];
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques);
  } else {
    console.error(`Jugador con ID ${jugadorId} no encontrado.`);
  }
  res.end();
});

app.get('/robot/:jugadorId/ataques', (req, res) =>{
  const jugadorId = req.params.jugadorId || '';
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
  res.send(
    { ataques: jugador.robot.ataques || [] 
    });
});

// Endpoint para obtener el estado de la sala
app.get('/sala/estado', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const jugadoresConRobot = jugadores.filter(j => j.robot && j.robot.nombre);
  res.send({
    jugadoresActivos: jugadores.length,
    jugadoresConRobot: jugadoresConRobot.length,
    salaLlena: jugadores.length >= 2,
    juegoListo: jugadoresConRobot.length >= 2
  });
});

// Endpoint para obtener todos los jugadores (para sincronización inicial)
app.get('/jugadores/:jugadorId', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const enemigos = jugadores.filter((jugador) => 
    jugador.id !== jugadorId && 
    jugador.robot && 
    jugador.robot.nombre && 
    typeof jugador.robot.x === 'number' && 
    typeof jugador.robot.y === 'number'
  );
  
  res.send({ enemigos });
});

// Endpoint para resetear la sala (opcional - para testing)
app.post('/sala/reset', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  jugadores.length = 0; // Vaciar el array
  console.log('Sala reseteada. Jugadores eliminados.');
  res.send({ mensaje: 'Sala reseteada correctamente' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
  console.log('Access from local network: http://[YOUR_IP]:3000');
});
