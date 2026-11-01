/* mercado.js */

let precioBitcoinActual = 64215.80;

setInterval(() => {
    const variacion = (Math.random() * 12 - 6);
    precioBitcoinActual = parseFloat((precioBitcoinActual + variacion).toFixed(2));
    const colorTexto = variacion >= 0 ? '#0ECB81' : '#F6465D';
    
    if (document.getElementById('live-price-indicator')) {
        document.getElementById('live-price-indicator').innerText = '$' + precioBitcoinActual.toFixed(2);
        document.getElementById('live-price-indicator').style.color = colorTexto;
    }
    if (document.getElementById('top-bar-price')) {
        document.getElementById('top-bar-price').innerText = '$' + precioBitcoinActual.toFixed(2);
        document.getElementById('top-bar-price').style.color = colorTexto;
    }
    if (document.getElementById('form-price-input')) {
        document.getElementById('form-price-input').value = precioBitcoinActual.toFixed(2);
    }

    // Le avisa al archivo de la billetera que actualice el gráfico en vivo
    if(typeof actualizarGraficoEnVivo === "function") {
        actualizarGraficoEnVivo(variacion >= 0);
    }
}, 2000);
