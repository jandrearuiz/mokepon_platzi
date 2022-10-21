const botonMascotaJugador = document.getElementById('boton-mascota');
const botonAtaqueFuego = document.getElementById('boton-fuego');
const botonAtaqueAgua = document.getElementById('boton-agua');
const botonAtaqueTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarReiniciar = document.getElementById('reiniciar');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascotas');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidaJugador = document.getElementById('vida-jugador');
const spanVidaEnemigo = document.getElementById('vida-enemigo');
const resultadoPartida = document.getElementById('resultado-partida');
const ataqueDelJugador = document.getElementById('ataque-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

let mokepones = [];

let ataqueJugador;
let ataqueEnemigo;
let opcionMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let vidaJugador = 3;
let vidaEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5);
let capipepo = new Mokepon('Capipepo', './assets/capipepo.jpg', 5);
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueta.png', 5);

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionSeleccionarReiniciar.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionMokepones = `<input class="inputMascota" type="radio" name="mascota" id=${mokepon.nombre}> 
        <label class="labelMascota" for=${mokepon.nombre}>${mokepon.nombre}</label>`

        console.log(opcionMokepones);

        contenedorTarjetas.innerHTML += opcionMokepones;

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonAtaqueFuego.addEventListener('click', ataqueFuego);
    botonAtaqueAgua.addEventListener('click', ataqueAgua);
    botonAtaqueTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
};

function seleccionarMascotaJugador() {
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
    resultadoPartida.innerHTML = resultado;
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo);
};

function crearMensajeFinal(resultadoFinal) {
    resultadoPartida.innerHTML = resultadoFinal;

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