let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";

    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "none";

    let botonMascota = document.getElementById("btn-mascota");
    botonMascota.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById("btn-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("btn-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("btn-tierra");
    botonTierra.addEventListener("click", ataqueTierra);

    let botonReiniciar = document.getElementById("btn-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "flex";

    let SectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    SectionSeleccionarMascota.style.display='none';
    
    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "block";

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
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");
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
    let sectionMensajes = document.getElementById("resultado");
    if (vidasEnemigo === 0) {
        sectionMensajes.innerHTML = "¡Felicidades! Has ganado el juego 🎉";
        document.getElementById("btn-fuego").disabled = true;
        document.getElementById("btn-agua").disabled = true;
        document.getElementById("btn-tierra").disabled = true;
    }else if (vidasJugador === 0) {
        sectionMensajes.innerHTML = "Lo siento, has perdido el juego 😢";
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
    let sectionMensajes = document.getElementById("resultado");
    let ataqueDeJugador = document.getElementById("ataque-de-jugador");
    let ataqueDeEnemigo = document.getElementById("ataque-de-enemigo");

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