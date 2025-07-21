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
mapa.width  = mapa.clientWidth;
mapa.height = mapa.clientHeight;

let jugadorId = null;
let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let botonDeAtaque;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesJugador;
let ataquesMokeponEnemigo;
let botonFuego ;
let botonAgua;
let botonTierra;
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
let alturaBuscada;
let anchoDelMapa = window.innerWidth -20 -20;
const anchoMaximoDelMapa = 600;


// Ajustar el ancho del mapa al ancho máximo permitido
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa
}
alturaBuscada = (anchoDelMapa * 400) / 600;
mapa.width = anchoDelMapa;
mapa.height = alturaBuscada;

class Mokepon {
    constructor(nombre, foto,foto_dark,vida,fotoMapa) {
        this.nombre = nombre;
        this.foto = foto;
        this.foto_dark = foto_dark;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 50;
        this.alto = 50;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
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

let hipodoge = new Mokepon("Hipodoge", "./assets/robot_alpha.png","./assets/blue_robot_alpha.png", 5, "./assets/cabeza_alpha.png");
let capipepo = new Mokepon("Capipepo", "./assets/robot_beta.png","./assets/blue_robot_beta.png", 5, "./assets/cabeza_beta.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/robot_gamma.png","./assets/blue_robot_gamma.png", 5, "./assets/cabeza_gamma.png");
//mokepones.push(hipodoge, capipepo, ratigueya);
//Enemigos
let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/robot_alpha.png","./assets/blue_robot_alpha.png", 5, "./assets/cabeza_alpha.png");
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/robot_beta.png","./assets/blue_robot_beta.png", 5, "./assets/cabeza_beta.png");
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/robot_gamma.png","./assets/blue_robot_gamma.png", 5, "./assets/cabeza_gamma.png");

hipodoge.ataques.push(
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🌱", id: "btn-tierra" })

capipepo.ataques.push(
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego"})

ratigueya.ataques.push(
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🌱", id: "btn-tierra" })

// Enemigos
hipodogeEnemigo.ataques.push(
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🌱", id: "btn-tierra" })

capipepoEnemigo.ataques.push(
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego"})

ratigueyaEnemigo.ataques.push(
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "🔥", id: "btn-fuego"},
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🌱", id: "btn-tierra" })

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

    sectionVerMapa.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
    })

    botonMascota.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);

    unirseAlJuego();
}
function unirseAlJuego() {
    fetch("http://localhost:3000/unirse")
        .then(function (res) {
            console.log(res);
            if (res.ok) {
                return res.text()
                .then(function (respuesta) {
                    console.log(respuesta);
                    jugadorId = respuesta;
                });
            } else {
                throw new Error("Error al unirse al juego");
            }
        });
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display='none';
    
    sectionReiniciar.style.display = "block";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert("Selecciona una mascota");
        return;
    }

    seleccionarRobot(mascotaJugador); 
    extraerAtaques();
    iniciarMapa();
}
function seleccionarRobot(mascotaJugador) {
    fetch(`http://localhost:3000/robot/${jugadorId}`,
         { method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            'robot': mascotaJugador
         })
         })
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}
function extraerAtaques() {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre === mascotaJugador) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
    //secuenciaAtaque();
}

function mostrarAtaques(ataques){
    ataques.forEach(ataque => {
        ataquesMokepon = `
            <button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });
    botonFuego = document.getElementById("btn-fuego");
    botonAgua = document.getElementById("btn-agua");
    botonTierra = document.getElementById("btn-tierra");
    botones = document.querySelectorAll(".BAtaque");

}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("Fuego");
                console.log(ataqueJugador);
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("Agua");
            } else if (e.target.textContent === "🌱") {
                ataqueJugador.push("Tierra");
            } else {
                console.error("Botón no reconocido");
            }
            ataqueAleatorioEnemigo();
            boton.disabled = true;
        });
    });
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("Fuego");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("Agua");
    } else {
        ataqueEnemigo.push("Tierra");
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
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            // Pasar los índices directamente
            indexAmbosOponentes(i, i);
            crearMensaje("🤝EMPATE🤝");
        } else if (
            (ataqueJugador[i] === "Fuego" && ataqueEnemigo[i] === "Tierra") ||
            (ataqueJugador[i] === "Agua" && ataqueEnemigo[i] === "Fuego") ||
            (ataqueJugador[i] === "Tierra" && ataqueEnemigo[i] === "Agua")
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
    /*
    document.getElementById("btn-fuego").disabled = true;
    document.getElementById("btn-agua").disabled = true;
    document.getElementById("btn-tierra").disabled = true;
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
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre === mascotaJugador) {
            return mokepones[i];
        }
    }
};


function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    // Dibuja el fondo del mapa
    lienzo.drawImage(mapaBackground, 
        0, 
        0, 
        mapa.width, 
        mapa.height
    );
    // Dibuja el personaje
    mascotaJugadorObjeto.pintarRobot();

    //Enviar posicion del robot al servidor
    enviarposicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
    // Dibuja los enemigos
    hipodogeEnemigo.pintarRobot();
    capipepoEnemigo.pintarRobot();
    ratigueyaEnemigo.pintarRobot();
    
    // Revisa colisiones con los enemigos
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColicion(hipodogeEnemigo);
        revisarColicion(capipepoEnemigo);
        revisarColicion(ratigueyaEnemigo);
    }
    
}

function enviarposicion(x, y) {
    fetch(`http://localhost:3000/robot/${jugadorId}/posicion`,
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
                        console.log(enemigos);
                    });
                }
            })
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