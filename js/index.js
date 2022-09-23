let ataqueJugador;
let ataqueEnemigo;
let vidaJugador = 3;
let vidaEnemigo = 3;

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    let botonAtaqueFuego = document.getElementById('boton-fuego');
    let botonAtaqueAgua = document.getElementById('boton-agua');
    let botonAtaqueTierra = document.getElementById('boton-tierra');
    let botonReiniciar = document.getElementById('boton-reiniciar');
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    let sectionSeleccionarReiniciar = document.getElementById('reiniciar');

    sectionSeleccionarAtaque.style.display = "none";
    sectionSeleccionarReiniciar.style.display = "none";
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonAtaqueFuego.addEventListener('click', ataqueFuego);
    botonAtaqueAgua.addEventListener('click', ataqueAgua);
    botonAtaqueTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
};

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascotas');

    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "HIPODOGE";
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "CAPIPEPO";
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "RATIGUEYA";
    } else {
        alert("Debes elegir una mascota");
        return;
    }

    sectionSeleccionarAtaque.style.display = "block";
    sectionSeleccionarMascota.style.display = "none"

    seleccionarMascotaEnemigo();
};

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = "HIPODOGE";
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = "CAPIPEPO";
    } else if (mascotaAleatoria == 3) {
        spanMascotaEnemigo.innerHTML = "RATIGUEYA";
    }
};

function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
};

function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
};

function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
};

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "AGUA"
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = "TIERRA"
    }

    combate();
};

function combate() {
    let spanVidaJugador = document.getElementById('vida-jugador');
    let spanVidaEnemigo = document.getElementById('vida-enemigo');
    
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
        vidaEnemigo--
        crearMensaje("GANASTE");
        spanVidaEnemigo.innerHTML = vidaEnemigo;
    } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
        vidaEnemigo--
        crearMensaje("GANASTE");
        spanVidaEnemigo.innerHTML = vidaEnemigo;
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
        vidaEnemigo--
        crearMensaje("GANASTE");
        spanVidaEnemigo.innerHTML = vidaEnemigo;
    } else {
        vidaJugador--
        spanVidaJugador.innerHTML = vidaJugador;
        crearMensaje("PERDISTE");
    };

    revisarVidas();

};

function revisarVidas() {
    if (vidaEnemigo == 0) {
        crearMensajeFinal("Ganaste, felicitaciones")
    } else if (vidaJugador == 0) {
        crearMensajeFinal("Perdiste, sigue intentando")
    }
};

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo = document.createElement('p');

    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo + ". " + resultado + "."
    sectionMensajes.appendChild(parrafo);
};

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo = document.createElement('p');
    let botonAtaqueFuego = document.getElementById('boton-fuego');
    let botonAtaqueAgua = document.getElementById('boton-agua');
    let botonAtaqueTierra = document.getElementById('boton-tierra');
    let sectionSeleccionarReiniciar = document.getElementById('reiniciar');

    
    parrafo.innerHTML = resultadoFinal;
    sectionMensajes.appendChild(parrafo);
    
    botonAtaqueFuego.disabled = true;
    botonAtaqueAgua.disabled = true;
    botonAtaqueTierra.disabled = true;
    sectionSeleccionarReiniciar.style.display = "block";
};

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

window.addEventListener('load', iniciarJuego);


// revisar cuando no he seleccionado ninguna mascota porque me está generando mascota del enemigo.