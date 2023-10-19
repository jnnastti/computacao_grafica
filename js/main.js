aviao = []

// show hidden tela
function habilitarDesabilitarTela(nome) {
    let tela = document.getElementById(`${nome}`)

    if(tela.style.display == 'block') {
        tela.style.display = 'none';

        return
    }

    tela.style.display = 'block';
    return
}

// checkar aviao no data grid
function checkAviao(id) {
    let aviao = document.getElementById(`aviao${id}`)

    if (aviao.style.backgroundColor == '') {
        aviao.style.backgroundColor = '#003552'
        return
    }

    aviao.style.backgroundColor = ''
    return
    
}

// verifica se campos estão preenchidos
function verificaCampos(x, y, r, a, d) {
    if(d == null || d == '') {
        return false
    }

    if(((x == null || x == '') && (y == null || y == '')) || ((r == null || r == '') && (a == null || a == ''))) {
        return false
    }

    return true
}

// inserir avião no datagrid
function inserirAviao() {
    let coorX           = document.querySelector('#coorX').value
    let coorY           = document.querySelector('#coorY').value
    let coorRaio        = document.querySelector('#coorRaio').value
    let coorAngulo      = document.querySelector('#angulo').value
    let inputDirecao    = document.querySelector('#direcao').value

    if(verificaCampos(coorX,coorY, coorRaio, coorAngulo, inputDirecao)) {
        if(!((coorX == null || coorX == '') && (coorY == null || coorY == ''))) {
            cartesianoParaPolar(x, y)
        }

        if(!((raio == null || raio == '') && (angulo == null || angulo == ''))) {
            polarParaCartesiano(raio, angulo)
        }
    }
}

// função para converter cartesiano para polar
function cartesianoParaPolar(x, y) {
    let raio = Math.sqrt(x * x + y * y);
    let angulo = Math.atan2(y, x);

    if(aviao.length < 10) {
        aviao.push({
            x : x,
            y : y,
            raio : raio,
            angulo : angulo
        })
    }
}

// tratamento de inputs
function tratarInputNumeros(inp) {
    let v = inp.value
    let valor = v.replace(/,/g, '.')

    valor = valor.replace(/[^0-9|.|-]/g, '')

    const pointCount = valor.split('.').length - 1;

    // Se houver mais de um ponto decimal, remova os extras
    if (pointCount > 1) {
        valor = valor.slice(0, valor.lastIndexOf('.'))
    }

    inp.selectionEnd = inp.value.length;

    return limitarCasasDecimais(valor);
}

function limitarCasasDecimais(numero) {
   const parts = numero.split('.');
  
    if (parts.length > 1 && parts[1].length > 2) {
        // Limit the number of decimal places
        const truncatedDecimal = parts[1].substring(0, 2);
        numero = parts[0] + '.' + truncatedDecimal;
    }

    return numero

}