# 🚀 Robots de Combate - Backend

Servidor Node.js para el juego multijugador de Robots de Combate.

## 🌐 API Endpoints

### Jugadores
- `GET /unirse` - Unirse al juego (devuelve ID único)
- `POST /robot/:jugadorId` - Asignar robot al jugador
- `POST /robot/:jugadorId/posicion` - Actualizar posición del robot
- `POST /robot/:jugadorId/ataques` - Enviar ataques del jugador
- `GET /robot/:jugadorId/ataques` - Obtener ataques del oponente

## 🛠️ Tecnologías

- **Node.js** - Runtime
- **Express.js** - Framework web
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Deployment en Railway

1. Conectar repositorio a Railway
2. Railway detecta automáticamente Node.js
3. Deploy automático en cada push

## 🔧 Variables de Entorno

- `PORT` - Puerto del servidor (Railway lo asigna automáticamente)

## 📊 Estado del Servidor

El servidor mantiene en memoria:
- Lista de jugadores conectados
- Posiciones de robots en el mapa
- Estado de combates activos
- Ataques seleccionados por jugador
