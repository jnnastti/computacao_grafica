function habilitarDesabilitarTela(nome) {
    let tela = document.getElementById(`${nome}`)

    if(tela.style.display == 'block') {
        tela.style.display = 'none';

        return
    }

    tela.style.display = 'block';
    return
}

function checkAviao(id) {
    let aviao = document.getElementById(`aviao${id}`)

    if (aviao.style.backgroundColor == '') {
        aviao.style.backgroundColor = '#003552'
        return
    }

    aviao.style.backgroundColor = ''
    return
    
}

function inserirAviao(){
    let x, y, raio, angulo
    let coorX = document.querySelector('#coorX').value
    let coorY = document.querySelector('#coorY').value
    let coorRaio = document.querySelector('#coorRaio').value
    let coorAngulo = document.querySelector('#angulo').value
    let inputVelocidade = document.querySelector('#velocidade').value // tem que criar esse campo ainda pelo o que vi
    let inputDirecao = document.querySelector('#direcao').value

    if (coorX != null && coorY != null){
        // foi inserido as coordenadas cartesianas, por isso colocamos as polares como null
        coorRaio   = null
        coorAngulo = null

        x = coorX
        y = coorY
        // chamar a função que o david criou para transformar cartesiano em polar, não sei fazer isso do JS pro PHP :/ e depois atribuir o valor as lets angulo e raio

    }
    
    if (coorRaio != null && coorAngulo != null){
        // foi inserido as coordenadas polares, por isso colocamos as cartesianas como null        
        coorX = null
        coorY = null

        angulo = coorAngulo
        raio   = coorRaio
        // chamar função que o david criou para transformar polar em cartesiano, não sei fazer isso do JS pro php :/ e depois atribuir o valor as lets x e y
        
    }

    // ao chegar nesse ponto do código ja deve ter todos os valores x, y, angulo, raio, velocidade e direcao preenchidos
    if (x && y && angulo && raio && inputVelocidade && inputDirecao) {
        // verificar se ja não existem 10 avioes no datagrid e adicionar caso tenha menos de 10
    }
}

// não vi exatamente onde pode ser usado isso mas ja deixei feito para que possa ser usado posteriormente, todos os inputs que vi são number e number por si só não permite número fracionado
function substituirVirgulaPorPonto(input) {
    // Obtém o valor do campo de entrada
    let valor = input.value;
    // Substitui todas as vírgulas por pontos
    valor = valor.replace(/,/g, '.');
    // Define o valor modificado de volta no campo de entrada
    return valor;
}

function limitarCasasDecimais(numero) {
    return parseFloat(numero.toFixed(2)); // duas casas após a virgula
    
}