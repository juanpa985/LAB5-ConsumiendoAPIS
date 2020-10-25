const container = document.querySelector("#container");
const resultado = document.querySelector("#resultado");
const fomulario = document.querySelector("#formulario");
const moneda = document.querySelector("#monedaInput");
const crypto = document.querySelector("#cryptoInput");

window.addEventListener('load', () => {
    fomulario.addEventListener('submit', buscarCrypto); //llamada a callback
});

function buscarCrypto(event){
    event.preventDefault();

    let valormoneda = moneda.value;
    let valorcrypto = crypto.value;

    console.log(`Moneda Cambio: ${valormoneda}`);
    console.log(`Criptomoneda: ${valorcrypto}`);

    if((valormoneda === "") || (valorcrypto === "")){
        mostraError("Ambos Campos son Obligatorios.");
    } else {
        consultarCrypto(valormoneda, valorcrypto);
    }

}

function  consultarCrypto(valormoneda, valorcrypto){
    const URL = `https://min-api.cryptocompare.com/data/price?fsym=${valorcrypto}&tsyms=${valormoneda}`;
    console.log(URL);

    //Promise
    showSpinner();
    fetch(URL)
        .then(response => response.json())
        .then(datos => {
            removeSpinner();
            if(datos.cod === "404"){
                mostraError("No se realizó la conversión");
            } else {
                console.log(datos);
                mostrarCrypto(datos);
            }
        })
}

function mostrarCrypto(datos){
    //const {Object: {crypto, }} = datos;
    const conversion=datos.toString();
    
    const cambio = document.createElement('p');
    cambio.innerHTML = `${conversion}  &#128512; <br>`; 

    cambio.classList.add('show-temp');
    const divResultado = document.createElement('div');
    divResultado.appendChild(cambio);
    container.appendChild(divResultado);

    setTimeout(() => {
        //$("#alerta").fadeOut("slow");
        divResultado.remove();
    }, 5000);

}

function removeSpinner(){
    const divSpinner = document.querySelector("#spinner");
    divSpinner.remove();
}

function showSpinner(){
    // referencia: https://tobiasahlin.com/spinkit/
    const divSpinner = document.createElement('div');
    divSpinner.setAttribute('id', 'spinner');
    divSpinner.classList.add('sk-chase', 'spinner-position');
    divSpinner.innerHTML = `<div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>`;
    container.appendChild(divSpinner);

}

function mostraError(mensaje){
    const alert = document.createElement('div');
    alert.innerHTML = `<div id="alerta" class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!!</strong> ${mensaje}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;

    alert.classList.add('mensaje-error');
    container.appendChild(alert);

    setTimeout(() => {
        //$("#alerta").fadeOut("slow");
        alert.remove();
    }, 5000);
}