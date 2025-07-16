let ataqueJugador;
let ataqueEnemigo;
function iniciarJuego() {
let botonMascota = document.getElementById("btn-mascota");
    botonMascota.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById("btn-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("btn-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("btn-tierra");
    botonTierra.addEventListener("click", ataqueTierra);
}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

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
        let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

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
    let spanAtaqueEnemigo = document.getElementById("ataque-enemigo");
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
    let sectionMensajes = document.getElementById("mensajes");
    //sectionMensajes.innerHTML = ""; // Limpiar mensajes anteriores

    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("EMPATE🤝");
    } else if (
        (ataqueJugador === "Fuego🔥" && ataqueEnemigo === "Tierra🌍") ||
        (ataqueJugador === "Agua💧" && ataqueEnemigo === "Fuego🔥") ||
        (ataqueJugador === "Tierra🌍" && ataqueEnemigo === "Agua💧")
    ) {
        crearMensaje("GANASTE🎊");
    } else {
        crearMensaje("PERDISTE💔");
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo} - ${resultado}`;

    sectionMensajes.appendChild(parrafo);
}

function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

window.addEventListener("load", iniciarJuego);