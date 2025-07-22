// Configuración dinámica de la URL del servidor
const BASE_URL = 'https://robots-game-production.up.railway.app';

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascota = document.getElementById("btn-mascota");
const botonReiniciar = document.getElementById("btn-reiniciar");

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");

/*let sectionMensajes = document.getElementById("resultado");*/
const ataqueDeJugador = document.getElementById("ataque-de-jugador");
const ataqueDeEnemigo = document.getElementById("ataque-de-enemigo");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

//Parte del Canvas
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

// Tamaño fijo del canvas para consistencia entre dispositivos
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Establecer tamaño fijo del canvas
mapa.width = CANVAS_WIDTH;
mapa.height = CANVAS_HEIGHT;

let jugadorId = null;
let enemigoId = null;
let robots = [];
let robotsEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeRobots;
let ataquesRobot;
let botonDeAtaque;
let inputRobotAlpha;
let inputRobotBeta;
let inputRobotGamma;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesJugador;
let ataquesRobotEnemigo;
let botonLaser ;
let botonMisiles;
let botonEscudo;
let botones = [];
let indexJugador;
let indexEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/robotsMap.png";

// Ya no necesitamos cálculo dinámico del tamaño - usar tamaño fijo

class Robot {
    constructor(nombre, foto,foto_dark,vida,fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.foto_dark = foto_dark;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 50;
        this.alto = 50;
        this.x = aleatorio(0, CANVAS_WIDTH - this.ancho);
        this.y = aleatorio(0, CANVAS_HEIGHT - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarRobot(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    );
    }
}

let robotAlpha = new Robot("Robot Alpha", "./assets/robot_alpha.png","./assets/blue_robot_alpha.png", 5, "./assets/cabeza_alpha.png");
let robotBeta = new Robot("Robot Beta", "./assets/robot_beta.png","./assets/blue_robot_beta.png", 5, "./assets/cabeza_beta.png");
let robotGamma = new Robot("Robot Gamma", "./assets/robot_gamma.png","./assets/blue_robot_gamma.png", 5, "./assets/cabeza_gamma.png");
//robots.push(robotAlpha, robotBeta, robotGamma);


const ROBOT_ALPHA_ATAQUES = [
    { nombre: "🚀", id: "btn-misiles" },
    { nombre: "🚀", id: "btn-misiles" },
    { nombre: "🚀", id: "btn-misiles" },
    { nombre: "⚡", id: "btn-laser"},
    { nombre: "🛡️", id: "btn-escudo" }
];
const ROBOT_BETA_ATAQUES = [
    { nombre: "🛡️", id: "btn-escudo" },
    { nombre: "🛡️", id: "btn-escudo" },
    { nombre: "🛡️", id: "btn-escudo" },
    { nombre: "🚀", id: "btn-misiles" },
    { nombre: "⚡", id: "btn-laser"}
];
const ROBOT_GAMMA_ATAQUES = [
    { nombre: "⚡", id: "btn-laser" },
    { nombre: "⚡", id: "btn-laser" },
    { nombre: "⚡", id: "btn-laser" },
    { nombre: "🚀", id: "btn-misiles" },
    { nombre: "🛡️", id: "btn-escudo" }
];

robotAlpha.ataques.push(...ROBOT_ALPHA_ATAQUES)

robotBeta.ataques.push(...ROBOT_BETA_ATAQUES)

robotGamma.ataques.push(...ROBOT_GAMMA_ATAQUES)




robots.push(robotAlpha, robotBeta, robotGamma);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

    sectionVerMapa.style.display = "none";

    robots.forEach((robot) => {
        opcionDeRobots = `
            <input type="radio" name="mascota" id="${robot.nombre}" />
            <label class="tarjeta-de-robot" for="${robot.nombre}">
                <p>${robot.nombre}</p>
                <img src="${robot.foto}" alt="${robot.nombre}">
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionDeRobots;

        inputRobotAlpha = document.getElementById("Robot Alpha");
        inputRobotBeta = document.getElementById("Robot Beta");
        inputRobotGamma = document.getElementById("Robot Gamma");
    })

    botonMascota.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);

    unirseAlJuego();
}
function unirseAlJuego() {
    fetch(`${BASE_URL}/unirse`)
        .then(function (res) {
            console.log(res);
            if (res.ok) {
                return res.text()
                .then(function (respuesta) {
                    console.log(respuesta);
                    jugadorId = respuesta;
                });
            } else if (res.status === 400) {
                // Sala llena
                return res.text().then(function(mensaje) {
                    alert('🤖 Sala llena: ' + mensaje + '\n\n¡Intenta de nuevo en unos minutos!');
                    // Deshabilitar la interfaz
                    document.body.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                                <h1 style="color: #333; margin-bottom: 20px;">🤖 Robots de Combate</h1>
                                <h2 style="color: #e74c3c; margin-bottom: 20px;">Sala Llena</h2>
                                <p style="color: #666; font-size: 18px; margin-bottom: 30px;">Ya hay 2 jugadores en combate.<br>¡Intenta de nuevo en unos minutos!</p>
                                <button onclick="location.reload()" style="background: #3498db; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 16px; cursor: pointer;">🔄 Intentar de Nuevo</button>
                            </div>
                        </div>
                    `;
                });
            } else {
                throw new Error("Error al unirse al juego");
            }
        })
        .catch(function(error) {
            console.error("Error de conexión:", error);
            alert("❌ Error de conexión con el servidor. ¿Está el backend funcionando?");
        });
}
function seleccionarMascotaJugador() {
    
    if (inputRobotAlpha.checked) {
        spanMascotaJugador.innerHTML = inputRobotAlpha.id;
        mascotaJugador = inputRobotAlpha.id;
    } else if (inputRobotBeta.checked) {
        spanMascotaJugador.innerHTML = inputRobotBeta.id;
        mascotaJugador = inputRobotBeta.id;
    } else if (inputRobotGamma.checked) {
        spanMascotaJugador.innerHTML = inputRobotGamma.id;
        mascotaJugador = inputRobotGamma.id;
    } else {
        alert("Selecciona un robot");
        return;
    }
    sectionSeleccionarMascota.style.display='none';
    sectionReiniciar.style.display = "block";
    seleccionarRobot(mascotaJugador); 
    extraerAtaques();
    iniciarMapa();
}
function seleccionarRobot(mascotaJugador) {
    fetch(`${BASE_URL}/robot/${jugadorId}`,
         { method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            'robot': mascotaJugador
         })
         })
         .then(function(res) {
             if (res.ok) {
                 console.log(`Robot ${mascotaJugador} seleccionado exitosamente`);
                 // Hacer una sincronización inicial después de seleccionar robot
                 setTimeout(sincronizacionInicial, 500);
             }
         })
         .catch(function(error) {
             console.error('Error al seleccionar robot:', error);
         });
}

function sincronizacionInicial() {
    fetch(`${BASE_URL}/jugadores/${jugadorId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json().then(function({ enemigos }) {
                    console.log('Sincronización inicial - enemigos encontrados:', enemigos);
                    if (enemigos.length > 0) {
                        robotsEnemigos = enemigos.map(function (enemigo) {
                            return crearRobotEnemigo(enemigo);
                        });
                    }
                });
            }
        })
        .catch(function(error) {
            console.error('Error en sincronización inicial:', error);
        });
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesRobotEnemigo = enemigo.ataques;
    secuenciaAtaque();
}
function extraerAtaques() {
    let ataques;
    for (let i = 0; i < robots.length; i++) {
        if (robots[i].nombre === mascotaJugador) {
            ataques = robots[i].ataques;
        }
    }
    mostrarAtaques(ataques);
    //secuenciaAtaque();
}

function mostrarAtaques(ataques){
    ataques.forEach(ataque => {
        ataquesRobot = `
            <button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesRobot;
    });
    botonLaser = document.getElementById("btn-laser");
    botonMisiles = document.getElementById("btn-misiles");
    botonEscudo = document.getElementById("btn-escudo");
    botones = document.querySelectorAll(".BAtaque");

}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.textContent === "⚡") {
                ataqueJugador.push("Laser");
                console.log(ataqueJugador);
            } else if (e.target.textContent === "🚀") {
                ataqueJugador.push("Misiles");
            } else if (e.target.textContent === "🛡️") {
                ataqueJugador.push("Escudo");
            } else {
                console.error("Botón no reconocido");
            }
            if( ataqueJugador.length === 5) {
                enviarAtaques();
            }
            boton.disabled = true;
        });
    });
}

function enviarAtaques(){
    fetch(`${BASE_URL}/robot/${jugadorId}/ataques`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50);
}
function obtenerAtaques() {
    fetch(`${BASE_URL}/robot/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques;
                        combate();
                    }
                });
            }
        });
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesRobotEnemigo.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("Laser");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("Misiles");
    } else {
        ataqueEnemigo.push("Escudo");
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexJugador = jugador;
    indexEnemigo = enemigo;
}

function combate() {
    clearInterval(intervalo);
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            // Pasar los índices directamente
            indexAmbosOponentes(i, i);
            crearMensaje("🤝EMPATE🤝");
        } else if (
            (ataqueJugador[i] === "Laser" && ataqueEnemigo[i] === "Escudo") ||
            (ataqueJugador[i] === "Misiles" && ataqueEnemigo[i] === "Laser") ||
            (ataqueJugador[i] === "Escudo" && ataqueEnemigo[i] === "Misiles")
        ) {
            indexAmbosOponentes(i, i);
            crearMensaje("🎊GANASTE🎊");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(i, i);
            crearMensaje("💔PERDISTE💔");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas();
}

function revisarVidas() {
    if(victoriasJugador === victoriasEnemigo){
        sectionMensajes.innerHTML = "🤝EMPATE🤝";
    }else if (victoriasJugador > victoriasEnemigo) {
        sectionMensajes.innerHTML = "Ganaste 🎉";
    }else {
        sectionMensajes.innerHTML = "Perdiste 😢"; 
    }
    
    // Hacer visible la tarjeta de mensajes al final del juego
    const divMensaje = document.getElementById("mensajes");
    divMensaje.style.visibility = "visible";
    divMensaje.style.opacity = "1";
    
    /*
    document.getElementById("btn-laser").disabled = true;
    document.getElementById("btn-misiles").disabled = true;
    document.getElementById("btn-escudo").disabled = true;
    */
}

function reiniciarJuego() {
    location.reload();
}

function crearMensaje(resultado) {
    const contenedorAtaques = document.querySelector('.ataques')
    const divMensaje = document.getElementById("mensajes")
    contenedorAtaques.addEventListener("click", (event) => {
        if (event.target.matches('button')) {
            divMensaje.style.visibility = "visible"
            divMensaje.style.opacity = "1"
        }
    })

    let parrafoAtaqueJugador = document.createElement("p");
    let parrafoAtaqueEnemigo = document.createElement("p");
    
    sectionMensajes.innerHTML = resultado;
    // Mostrar los ataques en lugar de los índices
    parrafoAtaqueJugador.innerHTML = ataqueJugador[indexJugador];
    parrafoAtaqueEnemigo.innerHTML = ataqueEnemigo[indexEnemigo];

    ataqueDeJugador.appendChild(parrafoAtaqueJugador);
    ataqueDeEnemigo.appendChild(parrafoAtaqueEnemigo);
}

function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
//Canvas
function extraerMascota() {
    for (let i = 0; i < robots.length; i++) {
        if (robots[i].nombre === mascotaJugador) {
            return robots[i];
        }
    }
};


function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Dibuja el fondo del mapa
    lienzo.drawImage(mapaBackground, 
        0, 
        0, 
        CANVAS_WIDTH, 
        CANVAS_HEIGHT
    );
    // Dibuja el personaje
    mascotaJugadorObjeto.pintarRobot();

    //Enviar posicion del robot al servidor
    enviarposicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
    // Dibuja los enemigos
    robotsEnemigos.forEach(function (robot) {
        robot.pintarRobot();
        revisarColicion(robot);
    });
}

function crearRobotEnemigo(enemigo) {
    let robotEnemigo = null;
    const robotNombre = enemigo.robot.nombre || '';
    
    if( robotNombre === "Robot Alpha" ) {
        robotEnemigo = new Robot("Robot Alpha", "./assets/robot_alpha.png","./assets/blue_robot_alpha.png", 5, "./assets/cabeza_alpha.png", enemigo.id);
    } else if (robotNombre === "Robot Beta") {
        robotEnemigo = new Robot("Robot Beta", "./assets/robot_beta.png","./assets/blue_robot_beta.png", 5, "./assets/cabeza_beta.png", enemigo.id);
    } else if (robotNombre === "Robot Gamma") {
        robotEnemigo = new Robot("Robot Gamma", "./assets/robot_gamma.png","./assets/blue_robot_gamma.png", 5, "./assets/cabeza_gamma.png", enemigo.id);
    }
    
    if (robotEnemigo) {
        robotEnemigo.x = enemigo.robot.x;
        robotEnemigo.y = enemigo.robot.y;
    }
    
    return robotEnemigo;
}

function enviarposicion(x, y) {
    fetch(`${BASE_URL}/robot/${jugadorId}/posicion`,
            { method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                x,
                y
            })
            })
            .then(function(res) {
                if (res.ok) {
                    res.json().then(function({ enemigos }) {
                        if (enemigos && enemigos.length > 0) {
                            robotsEnemigos = enemigos.map(crearRobotEnemigo).filter(robot => robot !== null);
                        } else {
                            // Si no hay enemigos, mantener la lista actual
                            robotsEnemigos = robotsEnemigos || [];
                        }
                    });
                }
            })
            .catch(function(error) {
                console.error('Error al enviar posición:', error);
            });
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moverArriba();
            break;
        case "ArrowDown":
        case "s":
            moverAbajo();
            break;
        case "ArrowLeft":
        case "a":
            moverIzquierda();
            break;
        case "ArrowRight":
        case "d":
            moverDerecha();
            break;
    }
}

function revisarColicion(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo =  enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaRobot = mascotaJugadorObjeto.y;
    const abajoRobot = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaRobot = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaRobot = mascotaJugadorObjeto.x;

    if(
        abajoRobot < arribaEnemigo ||
        arribaRobot > abajoEnemigo ||
        derechaRobot < izquierdaEnemigo ||
        izquierdaRobot > derechaEnemigo
    ){
        return;
    }
    // Aquí puedes agregar la lógica para manejar la colisión
    detenerMovimiento();
    clearInterval(intervalo);
    enemigoId = enemigo.id || '';
    sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);
}

function iniciarMapa() {
    //600/400
    mascotaJugadorObjeto = extraerMascota();
    sectionVerMapa.style.display = "flex";
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener("keydown", sePresionaTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

window.addEventListener("load", iniciarJuego);