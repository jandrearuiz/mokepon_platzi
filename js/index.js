const botonMascotaJugador = document.getElementById('boton-mascota');
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
const contenedorAtaques = document.getElementById('contenedor-ataques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];

let opcionMokepones;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let objetoJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonAtaqueFuego;
let botonAtaqueAgua;
let botonAtaqueTierra;
let ataqueEnemigo = [];
let botones = [];
let ataqueJugador = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
const lienzo = mapa.getContext('2d');
let intervalo;
const mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    };
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/cara_hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/capipepo.jpg', 5, './assets/cara_capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/cara_ratigueya.png');

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/cara_hipodoge.png', 80, 120);
let capipepoEnemigo = new Mokepon('Capipepo', './assets/capipepo.jpg', 5, './assets/cara_capipepo.png', 150, 95);
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/cara_ratigueya.png', 200, 190);

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
    sectionVerMapa.style.display = "none";


    mokepones.forEach((mokepon) => {
        opcionMokepones = `<input class="inputMascota" type="radio" name="mascota" id=${mokepon.nombre}> 
        <label class="labelMascota" for=${mokepon.nombre}>
        ${mokepon.nombre}
        <img  style="display: none" src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>`

        contenedorTarjetas.innerHTML += opcionMokepones;

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
};

function seleccionarMascotaJugador() {
    // sectionSeleccionarAtaque.style.display = "block";
    sectionSeleccionarMascota.style.display = "none";
    sectionVerMapa.style.display = 'flex';
    
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
        alert("Debes elegir una mascota");
        return;
    }
    
    extaerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
    iniciarMapa();
};

function extaerAtaques(mascotaJugador) {
    let ataques;

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        };
    };
    mostrarAtaques(ataques);
};

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button class="buttonAtaq BAtaque" id=${ataque.id}>${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botones = document.querySelectorAll('.BAtaque');
};

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                boton.style.background = '#112F58';
                boton.style.border = '1px solid #112F58';
                boton.disabled = true;
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                boton.style.background = '#112F58';
                boton.style.border = '1px solid #112F58';
                boton.disabled = true;
            } else if (e.target.textContent === '🌱') {
                ataqueJugador.push('TIERRA');
                boton.style.background = '#112F58';
                boton.style.border = '1px solid #112F58';
                boton.disabled = true;
            };
            ataqueAleatorioEnemigo();
        });
    });
};

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;

    secuenciaAtaque();
};

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    iniciarPelea();
};

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
};

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
};

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexOponentes(index, index)
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexOponentes(index, index)
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexOponentes(index, index)
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexOponentes(index, index)
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador;
        } else {
            indexOponentes(index, index)
            crearMensaje("PERDISTE");
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = victoriasEnemigo;
        }
    };

    revisarVidas();

};

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Ganaste, felicitaciones");
    } else {
        crearMensajeFinal("Perdiste, sigue intentando")
    };
};

function crearMensaje(resultado) {
    resultadoPartida.innerHTML = resultado;
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo);
};

function crearMensajeFinal(resultadoFinal) {
    resultadoPartida.innerHTML = resultadoFinal;

    sectionSeleccionarReiniciar.style.display = "block";
};

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function pintarCanvas() {
    objetoJugador.x = objetoJugador.x + objetoJugador.velocidadX;
    objetoJugador.y = objetoJugador.y + objetoJugador.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objetoJugador.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
}

function moverDerecha() {
    objetoJugador.velocidadX = 5;
}

function moverIzquierda() {
    objetoJugador.velocidadX = -5;
}

function moverArriba() {
    objetoJugador.velocidadY = -5;
}

function moverAbajo() {
    objetoJugador.velocidadY = 5;
}

function detenerMovimiento() {
    objetoJugador.velocidadX = 0;
    objetoJugador.velocidadY = 0;
};

function presionaronTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        case 'ArrowLeft':
            moverIzquierda()
        default:
            break
    };
};

function iniciarMapa() {
    mapa.width = 800;
    mapa.height = 600;
    objetoJugador = obtenerMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener('keydown', presionaronTecla);
    window.addEventListener('keyup', detenerMovimiento);
};

function obtenerMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        };
    };
};

window.addEventListener('load', iniciarJuego);