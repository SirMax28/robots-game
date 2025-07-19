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

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let botonDeAtaque;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
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


class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/robot_alpha.png", 5);
let capipepo = new Mokepon("Capipepo", "./assets/robot_beta.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./assets/robot_gamma.png", 5);
//mokepones.push(hipodoge, capipepo, ratigueya);

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

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

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
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";
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
    
    extraerAtaques();
    seleccionarMascotaEnemigo();
}
function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
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

window.addEventListener("load", iniciarJuego);