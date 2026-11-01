/* billetera.js */

let saldoUSDT = 5000.00;
let saldoBTC = 0.0000;

// FUNCION DE LOGIN INTERACTIVO
function ejecutarLogin() {
    const usuario = document.getElementById('login-user').value;
    if(usuario.trim() === "") {
        alert("Por favor introduce un correo de usuario universitario.");
        return;
    }
    document.getElementById('user-display-name').innerText = usuario;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-exchange-interface').style.display = 'block';
    
    // Generar barras iniciales del grafico una vez logueado
    inicializarGraficoSimulado();
}

// FUNCION PARA INTERACTUAR CON LAS PESTAÑAS (CAMBIAR DE PANTALLA)
function cambiarVistaPrincipal(nombreVista) {
    document.getElementById('tab-btn-spot').classList.remove('active');
    document.getElementById('tab-btn-wallet').classList.remove('active');
    
    document.getElementById('view-trading-spot').style.display = 'none';
    document.getElementById('view-wallet-panel').style.display = 'none';
    
    if(nombreVista === 'spot') {
        document.getElementById('tab-btn-spot').classList.add('active');
        document.getElementById('view-trading-spot').style.display = 'flex';
    } else if(nombreVista === 'wallet') {
        document.getElementById('tab-btn-wallet').classList.add('active');
        document.getElementById('view-wallet-panel').style.display = 'block';
        actualizarPantallaBilleteraCompleta();
    }
}

// ACTUALIZACIÓN DE LOS CUADROS Y TABLAS DE LA BILLETERA
function actualizarPantallaBilleteraCompleta() {
    const valorConvertidoBTC = saldoBTC * precioBitcoinActual;
    const balanceTotalEstimado = saldoUSDT + valorConvertidoBTC;
    
    // Actualizar textos de la vista de Billetera
    document.getElementById('wallet-total-est').innerText = '$' + balanceTotalEstimado.toFixed(2) + ' USDT';
    document.getElementById('table-balance-usdt').innerText = saldoUSDT.toFixed(2);
    document.getElementById('table-avail-usdt').innerText = saldoUSDT.toFixed(2);
    document.getElementById('table-value-usdt').innerText = '$' + saldoUSDT.toFixed(2);
    
    document.getElementById('table-balance-btc').innerText = saldoBTC.toFixed(4);
    document.getElementById('table-avail-btc').innerText = saldoBTC.toFixed(4);
    document.getElementById('table-value-btc').innerText = '$' + valorConvertidoBTC.toFixed(2);
    
    // Actualizar pantallas de acceso rapido en la zona de trading
    document.querySelectorAll('.wallet-usdt-display').forEach(el => {
        el.innerText = '$' + saldoUSDT.toFixed(2) + ' USDT';
    });
}

function procesarCompraCripto() {
    const inputCantidad = document.getElementById('form-amount-input');
    const cantidadAComprar = parseFloat(inputCantidad.value);
    
    if (isNaN(cantidadAComprar) || cantidadAComprar <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }
    
    const precioDeCompra = precioBitcoinActual;
    const costoTotal = precioDeCompra * cantidadAComprar;
    
    if (saldoUSDT >= costoTotal) {
        saldoUSDT = saldoUSDT - costoTotal;
        saldoBTC = saldoBTC + cantidadAComprar;
        
        actualizarPantallaBilleteraCompleta();
        agregarFilaHistorial(cantidadAComprar, precioDeCompra, costoTotal);
        inputCantidad.value = '';
        
        alert("¡Compra Exitosa!\nHas añadido fondos a tu cartera Spot.");
    } else {
        alert("Error: Fondos Insuficientes en tu saldo actual.");
    }
}

function agregarFilaHistorial(cantidad, precio, total) {
    const tablaBody = document.getElementById('history-table-body');
    const horaActual = new Date().toLocaleTimeString();
    const nuevaFila = `
        <tr style="border-bottom: 1px solid #2B3139;">
            <td style="padding: 6px; color: #848E9C;">${horaActual}</td>
            <td style="padding: 6px; color: #0ECB81; font-weight: bold;">COMPRA</td>
            <td style="padding: 6px;">$${precio.toFixed(2)}</td>
            <td style="padding: 6px;">${cantidad.toFixed(4)} BTC</td>
            <td style="padding: 6px; color: #FFFFFF;">$${total.toFixed(2)} USDT</td>
        </tr>
    `;
    tablaBody.innerHTML = nuevaFila + tablaBody.innerHTML;
}

// INICIALIZACIÓN DE BARRAS DEL GRÁFICO INTERNO
function inicializarGraficoSimulado() {
    const chartBox = document.getElementById('mock-chart-visual');
    if(!chartBox) return;
    chartBox.innerHTML = "";
    for(let i=0; i<15; i++) {
        const alturaAleatoria = Math.floor(Math.random() * 70) + 15;
        const colorBarra = Math.random() > 0.4 ? '#0ECB81' : '#F6465D';
        chartBox.innerHTML += `<div class="chart-bar" style="height: ${alturaAleatoria}%; background-color: ${colorBarra};"></div>`;
    }
}

// ACTUALIZAR GRÁFICO CUANDO CAMBIE EL MERCADO (Lamada desde mercado.js)
function actualizarGraficoEnVivo(sube) {
    const barras = document.querySelectorAll('.chart-bar');
    if(barras.length === 0) return;
    const barraAleatoria = barras[Math.floor(Math.random() * barras.length)];
    const nuevaAltura = Math.floor(Math.random() * 70) + 15;
    barraAleatoria.style.height = nuevaAltura + '%';
    barraAleatoria.style.background = sube ? '#0ECB81' : '#F6465D';
}

document.getElementById('btn-execute-trade').addEventListener('click', procesarCompraCripto);
actualizarPantallaBilleteraCompleta();
