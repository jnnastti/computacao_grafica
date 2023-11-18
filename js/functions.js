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
