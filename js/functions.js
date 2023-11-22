var avioes = []

// Cria e retorna uma variavel avião
function Aviao(x, y, raio, angulo, direcao, ativo = true) {
    this.id = avioes.length + 1
	this.x = x;
	this.y = y;
	this.raio = limitarCasasDecimais(raio);
	this.angulo = limitarCasasDecimais(angulo);
	this.direcao = direcao;
    this.ativo = ativo
}

// função para converter cartesiano para polar
function cartesianoParaPolar(x, y, direcao) {
	let raio = Math.sqrt(x * x + y * y);
	let angulo = Math.atan2(y, x) * (180 / Math.PI); // Adicionei o * (180 / Math.PI) para converter de radiano para degrau
	
    if (avioes.length < 10) {
		let aviao = new Aviao(x, y, raio, angulo, direcao)
		console.log(aviao)
		avioes.push(aviao)
	}

	let msg = "Cartesiano -> Polar, avião adicionado: " + x + " | " + y + " | " + raio + " | " + angulo
	console.log(msg)
}

// função para converter polar para cartesiano
function polarParaCartesiano(coorRaio, coorAngulo, direcao) {
	let x = coorRaio * Math.cos(coorAngulo);
	let y = coorRaio * Math.sin(coorAngulo);
	
    if (avioes.length < 10) {
		let aviao = new Aviao(x, y, coorRaio, coorAngulo, direcao)
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
	console.log(x,y); // debug
	return x, y // retorna os dois pontos ja nas suas posições rotacionadas
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

	thAtivo.innerText = 'Ativo'
	thId.innerText = 'ID'
	thCoordX.innerText = 'Coord X'
	thCoordY.innerText = 'Coord Y'
	thRaio.innerText = 'Raio'
	thAngulo.innerText = 'Ângulo'
	thDirecao.innerText = 'Direção'

	tr.appendChild(thAtivo)
	tr.appendChild(thId)
	tr.appendChild(thCoordX)
	tr.appendChild(thCoordY)
	tr.appendChild(thRaio)
	tr.appendChild(thAngulo)
	tr.appendChild(thDirecao)

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
// A função recebe um valor float (Odeio que JS não define variável) que será para pegar todos os aviões entre essa distância 
// do aeroporto
// E devolve uma lista de todos os aviões encontrado (Odeio que não tem pointers) 
// https://i.redd.it/kh726uczjnq71.png
function distanciaMinimaAeroporto(dist) {
	var avioesEmDistMinima = []
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
	paresAvioes = []
	for (let i = 0; i < avioes.length; i++) {
		for (let j = i + 1; j < avioes.length; j++) {
			if(distanciaEntreAvioes(avioes[i], avioes[j]) <= dist) {
				paresAvioes.push([avioes[i], avioes[j]])
			}
		}
	}
}

// Função necessária para pegar a distância euclidiana entre 2 aviôes
function distanciaEntreAvioes(a1, a2) {
	let distanciaX = a2.x - a1.x;
    let distanciaY = a2.y - a1.y;
    return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
}