var avioes = []
var intervaloAceitavel = 2

// Cria e retorna uma variavel avião
function Aviao(x, y, raio, angulo, direcao, velocidade, ativo = true) {
    this.id = avioes.length + 1
	this.x = x;
	this.y = y;
	this.raio = limitarCasasDecimais(raio);
	this.angulo = limitarCasasDecimais(angulo);
	this.direcao = direcao;
	this.velocidade = velocidade;
    this.ativo = ativo
}

// função para converter cartesiano para polar
function cartesianoParaPolar(x, y, direcao, velocidade) {
	let raio = Math.sqrt(x * x + y * y);
	let angulo = Math.atan2(y, x) * (180 / Math.PI); // Adicionei o * (180 / Math.PI) para converter de radiano para degrau
	
    if (avioes.length < 10) {
		let aviao = new Aviao(x, y, raio, angulo, direcao, velocidade)
		console.log(aviao)
		avioes.push(aviao)
	}

	let msg = "Cartesiano -> Polar, avião adicionado: " + x + " | " + y + " | " + raio + " | " + angulo
	console.log(msg)
}

// função para converter polar para cartesiano
function polarParaCartesiano(coorRaio, coorAngulo, direcao, velocidade) {
	let x = coorRaio * Math.cos(coorAngulo);
	let y = coorRaio * Math.sin(coorAngulo);
	
    if (avioes.length < 10) {
		let aviao = new Aviao(x, y, coorRaio, coorAngulo, direcao, velocidade)
		console.log(aviao)
		avioes.push(aviao)
	}

	let msg = "Polar -> Cartesiano, avião adicionado: " + x + " | " + y + " | " + coorRaio + " | " + coorAngulo
	console.log(msg)
}


// funcao de rotacionar
function rotacionarPonto(x, y, angulo){
	x = (x * Math.cos(angulo)) - (y * Math.sin(angulo))

	y = (y * Math.cos(angulo)) + (x * Math.sin(angulo))
	return {
		x: x, 
		y: y
	} // retorna os dois pontos ja nas suas posições rotacionadas
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

// tratativa de casas decimais
function limitarCasasDecimais(numero) {
	if (typeof (numero) == 'number')
		numero = String(numero)

	const parts = numero.split('.');

	if (parts.length > 1 && parts[1].length > 2) {
		// Limit the number of decimal places
		const truncatedDecimal = parts[1].substring(0, 2);
		numero = parts[0] + '.' + truncatedDecimal;
	}

	return numero
}

function gerarTituloDatagrid() {
	let tr = document.createElement('tr')
	let thAtivo = document.createElement('th')
	let thId = document.createElement('th')
	let thCoordX = document.createElement('th')
	let thCoordY = document.createElement('th')
	let thRaio = document.createElement('th')
	let thAngulo = document.createElement('th')
	let thDirecao = document.createElement('th')
	let thVel = document.createElement('th')

	thAtivo.innerText = 'Ativo'
	thId.innerText = 'ID'
	thCoordX.innerText = 'Coord X'
	thCoordY.innerText = 'Coord Y'
	thRaio.innerText = 'Raio'
	thAngulo.innerText = 'Ângulo'
	thDirecao.innerText = 'Direção'
	thVel.innerText = 'Vel'

	tr.appendChild(thAtivo)
	tr.appendChild(thId)
	tr.appendChild(thCoordX)
	tr.appendChild(thCoordY)
	tr.appendChild(thRaio)
	tr.appendChild(thAngulo)
	tr.appendChild(thDirecao)
	tr.appendChild(thVel)

	return tr
}

// função separada para criar infos do aviao
function gerarColDatagrid(item) {
	let td = document.createElement("td")
	let p = document.createElement("p")

	p.innerText = item

	td.appendChild(p)

	return td
}

// Essa função é para medir a distância de cada avião do aeroporto (raio)
// A função recebe um valor float que será para pegar todos os aviões entre essa distância 
// do aeroporto E devolve uma lista de todos os aviões encontrado 
function distanciaMinimaAeroporto(dist) {
	let avioesEmDistMinima = []

	for (let aviao of avioes) {
		if (aviao.raio <= dist) {
			avioesEmDistMinima.push(aviao);
		}
	}

	return avioesEmDistMinima
}

// Essa função é para medir a distância entre cada avião em voo
// A função recebe um valor float que será para pegar todos os pares de aviões que estão entre essa distância 
// E devolve uma lista de todos os aviões encontrado
function distanciaMinimaAviao(dist) {
	// Magia negra para iterar todos os aviões e salvar recursos
	// Lista contendo pares que estão em uma lista também
	// Exemplo paresAvioes = [[aviao[1], aviao[2]], [aviao[1], aviao[3]]]
	let paresAvioes = []

	for (let i = 0; i < avioes.length; i++) {
		for (let j = i + 1; j < avioes.length; j++) {
			if(distanciaEntreAvioes(avioes[i], avioes[j]) <= dist) {
				paresAvioes.push([avioes[i], avioes[j]])
			}
		}
	}

	return paresAvioes
}

// Função necessária para pegar a distância euclidiana entre 2 aviôes
function distanciaEntreAvioes(a1, a2) {
	let distanciaX = a2.x - a1.x;
    let distanciaY = a2.y - a1.y;

    return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
}

//Função para calcular rota de colisão
/*
function calcularRotaDeColisaoComTempo(tempo) {
	let avioesEmRotaDeColisao = []

	for (let i = 0; i < avioes.length; i++) {
		for (let j = i + 1; j < avioes.length; j++) {
			var emRota = emRotaDeColisao(avioes[i], avioes[j], tempo)

			if (emRota) {
				avioesEmRotaDeColisao.push(emRota)
			}
		}
	}

	return avioesEmRotaDeColisao
}

function emRotaDeColisao(aviao1, aviao2, tempo) {
	let x1 = aviao1.x
	let y1 = aviao1.y
	let v1 = aviao1.velocidade

	let x2 = aviao2.x
	let y2 = aviao2.y
	let v2 = aviao2.velocidade

	// Calcular as posições no momento futuro
	const x1Futuro = parseFloat(x1) + parseFloat(v1) * parseFloat(tempo);
	const y1Futuro = parseFloat(y1) + parseFloat(v1) * parseFloat(tempo);
	const x2Futuro = parseFloat(x2) + parseFloat(v2) * parseFloat(tempo);
	const y2Futuro = parseFloat(y2) + parseFloat(v2) * parseFloat(tempo);

	// Verificar se os objetos estarão próximos no momento futuro
	const distanciaAoQuadrado = (x1Futuro - x2Futuro) ** 2 + (y1Futuro - y2Futuro) ** 2;

	// Se a distância ao quadrado for menor que zero, os objetos estão colidindo
	if (distanciaAoQuadrado < 0) {
		return { aviao1: aviao1, aviao2: aviao2, x: x1Futuro, y: y1Futuro, tempo: tempo };
	} else {
		return false;
	}
}
*/

// Converte um ângulo de graus para radianos
function grausParaRadianos(graus) {
    return graus * (Math.PI / 180);
}

function calcularCoeficienteAngular(direcao) {
    return direcao.y / direcao.x;
}

// Calcula a equação da trajetória linear de um avião com base em sua posição e ângulo
function calcularTrajetoria(aviao) {
    // Calcula o coeficiente angular (m) da trajetória usando a tangente do ângulo em radianos
    let m = calcularCoeficienteAngular(aviao.direcao);
    // Calcula a interseção y (b) da trajetória com base na posição inicial do avião
    let b = aviao.y - m * aviao.x;
    return { m, b };
}

// Calcula se há uma colisão entre dois aviões com base em suas trajetórias
function calcularColisaoEntreTodos(avioes, tempoMinimo) {
    let colisoes = [];

    for (let i = 0; i < avioes.length; i++) {
        for (let j = i + 1; j < avioes.length; j++) {
            let aviaoA = avioes[i];
            let aviaoB = avioes[j];
            let resultado = calcularColisaoEspecifica(aviaoA, aviaoB, tempoMinimo);

            if (resultado.colisao) {
                colisoes.push({ aviaoA: aviaoA.id, aviaoB: aviaoB.id, ponto: resultado.ponto, tempoColisao: resultado.tempoColisao });
            }
        }
    }

    return colisoes;
}

function calcularColisaoEspecifica(aviaoA, aviaoB, tempoMinimo) {
    let trajetoriaA = calcularTrajetoria(aviaoA);
    let trajetoriaB = calcularTrajetoria(aviaoB);

    let x = (trajetoriaB.b - trajetoriaA.b) / (trajetoriaA.m - trajetoriaB.m);
    let y = trajetoriaA.m * x + trajetoriaA.b;

    let tempoA = calculaTempo(x, y, aviaoA.velocidade);
    let tempoB = calculaTempo(x, y, aviaoB.velocidade);

    let diferencaTempo = Math.abs(tempoA - tempoB);
    if (diferencaTempo <= tempoMinimo) {
        let tempoColisao = Math.min(tempoA, tempoB);
        return { colisao: true, ponto: { x, y }, tempoColisao };
    } else {
        return { colisao: false };
    }
}

// Função para calcular o tempo necessário para um avião chegar ao ponto de interseção
function calculaTempo(x, y, velocidade) {
    // Calcula a distância do avião até o ponto de interseção
    let distancia = Math.sqrt(x * x + y * y);
    // Calcula o tempo baseado na distância e na velocidade
    return distancia / velocidade;
}
