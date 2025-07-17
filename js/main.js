const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascota = document.getElementById("btn-mascota");
const botonFuego = document.getElementById("btn-fuego");
const botonAgua = document.getElementById("btn-agua");
const botonTierra = document.getElementById("btn-tierra");
const botonReiniciar = document.getElementById("btn-reiniciar");

const SectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");

/*let sectionMensajes = document.getElementById("resultado");*/
const ataqueDeJugador = document.getElementById("ataque-de-jugador");
const ataqueDeEnemigo = document.getElementById("ataque-de-enemigo");

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;




function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";
    botonMascota.addEventListener("click", seleccionarMascotaJugador);
    botonFuego.addEventListener("click", ataqueFuego);
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";
    SectionSeleccionarMascota.style.display='none';
    sectionReiniciar.style.display = "block";
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Selecciona una mascota");
    }
    seleccionarMascotaEnemigo();
}
function seleccionarMascotaEnemigo() {
        let mascotaAleatoria = aleatorio(1, 3);
        if(mascotaAleatoria == 1) {
            spanMascotaEnemigo.innerHTML = "Hipodoge";
        } else if(mascotaAleatoria == 2) {
            spanMascotaEnemigo.innerHTML = "Capipepo";
        } else {
            spanMascotaEnemigo.innerHTML = "Ratigueya";
        }
    }
function ataqueFuego() {
    ataqueJugador = "Fuego🔥";
    ataqueAleatorioEnemigo();
}
function ataqueAgua() {
    ataqueJugador = "Agua💧";
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = "Tierra🌍";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Fuego🔥";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Agua💧";
    } else {
        ataqueEnemigo = "Tierra🌍";
    }
    combate();
}


function combate() {
    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("🤝EMPATE🤝", ataqueJugador, ataqueEnemigo);
    } else if (
        (ataqueJugador === "Fuego🔥" && ataqueEnemigo === "Tierra🌍") ||
        (ataqueJugador === "Agua💧" && ataqueEnemigo === "Fuego🔥") ||
        (ataqueJugador === "Tierra🌍" && ataqueEnemigo === "Agua💧")
    ) {
        crearMensaje("🎊GANASTE🎊", ataqueJugador, ataqueEnemigo);
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("💔PERDISTE💔", ataqueJugador, ataqueEnemigo);
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        sectionMensajes.innerHTML = "Ganaste 🎉";
        document.getElementById("btn-fuego").disabled = true;
        document.getElementById("btn-agua").disabled = true;
        document.getElementById("btn-tierra").disabled = true;
    }else if (vidasJugador === 0) {
        sectionMensajes.innerHTML = "Perdiste 😢";
        document.getElementById("btn-fuego").disabled = true;
        document.getElementById("btn-agua").disabled = true;
        document.getElementById("btn-tierra").disabled = true;
    }
}

function reiniciarJuego() {
    location.reload();
}

function crearMensaje(resultado, ataqueJugador, ataqueEnemigo) {
    //sectionMensajes.innerHTML = ""; // Limpiar mensajes anteriores
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
    parrafoAtaqueJugador.innerHTML =  ataqueJugador;
    parrafoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataqueDeJugador.appendChild(parrafoAtaqueJugador);
    ataqueDeEnemigo.appendChild(parrafoAtaqueEnemigo);
}

function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

window.addEventListener("load", iniciarJuego);