# 🤖 Robots de Combate - Juego Multijugador

Un emocionante juego de combate por turnos con robots, donde los jugadores se enfrentan en tiempo real en un mapa interactivo.

## 🎮 [¡JUGAR AHORA!](https://sirmax.github.io/ping-pong-game/)

## 🎯 Características

- 🤖 **3 Robots únicos**: Robot Alpha, Robot Beta y Robot Gamma
- ⚔️ **Sistema de combate estratégico**: Láser vs Escudo vs Misiles
- 🗺️ **Mapa interactivo**: Muévete por el mapa para encontrar oponentes
- 👥 **Multijugador en tiempo real**: Juega contra otros jugadores online
- 📱 **Responsive**: Compatible con móviles y desktop
- 🎨 **Interfaz moderna**: Diseño atractivo con animaciones

## 🕹️ Cómo Jugar

1. **Selecciona tu Robot**: Elige entre Alpha, Beta o Gamma
2. **Explora el Mapa**: Usa las flechas o WASD para moverte
3. **Encuentra un Oponente**: Cuando te acerques a otro jugador, ¡comienza el combate!
4. **Combate Estratégico**: Selecciona 5 ataques para la batalla
5. **¡Gana la partida!**: El mejor de 5 ataques gana

## ⚔️ Sistema de Combate

- **⚡ Láser** vence a **🛡️ Escudo**
- **🚀 Misiles** vencen a **⚡ Láser**  
- **🛡️ Escudo** vence a **🚀 Misiles**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura del juego
- **CSS3** - Estilos y animaciones
- **JavaScript ES6** - Lógica del juego
- **Canvas API** - Renderizado del mapa

### Backend
- **Node.js** - Servidor
- **Express.js** - API REST
- **CORS** - Comunicación cross-origin

## 🚀 Deployment

- **Frontend**: GitHub Pages
- **Backend**: Railway
- **CI/CD**: Automático con GitHub Actions

## 📁 Estructura del Proyecto

```
ping-pong-game/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos del juego
├── js/
│   └── main.js         # Lógica principal
├── assets/
│   ├── robot_*.png     # Imágenes de robots
│   ├── blue_robot_*.png # Robots enemigos
│   ├── cabeza_*.png    # Avatares para el mapa
│   └── robotsMap.png   # Fondo del mapa
└── README.md
```

## 🎮 Controles

### Mapa
- **Flechas** o **WASD**: Mover robot
- **Mouse/Touch**: Botones de movimiento en móvil

### Combate
- **Click**: Seleccionar ataques
- **Estrategia**: Piensa bien tu secuencia de 5 ataques

## 🌟 Características Técnicas

- **Tiempo Real**: Sincronización automática entre jugadores
- **Estado Persistente**: El servidor mantiene las posiciones de todos los jugadores
- **Detección de Colisiones**: Sistema preciso para encuentros entre robots
- **API RESTful**: Comunicación eficiente cliente-servidor

## 👨‍💻 Desarrollo

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/ping-pong-game.git

# Instalar dependencias del servidor
npm install

# Ejecutar servidor local
npm start

# El juego estará disponible en http://localhost:3000
```

### Servidor de Desarrollo

El backend incluye:
- Sistema de jugadores dinámico
- API de posicionamiento en tiempo real
- Sistema de combate por turnos
- Gestión de estado de la partida

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - tu@email.com

Link del Proyecto: [https://github.com/tuusuario/ping-pong-game](https://github.com/tuusuario/ping-pong-game)

---

⭐ ¡No olvides darle una estrella al proyecto si te gustó!
