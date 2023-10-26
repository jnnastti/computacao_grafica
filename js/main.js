var avioes = []

// Cria e retorna uma variável Avião
function Aviao(x, y, raio, angulo, direcao) {
	this.x = x;
	this.y = y;
	this.raio = limitarCasasDecimais(raio);
	this.angulo = limitarCasasDecimais(angulo);
	this.direcao = direcao;
}

// show hidden tela
function habilitarDesabilitarTela(nome) {
	let tela = document.getElementById(`${nome}`)

	if (tela.style.display == 'block') {
		tela.style.display = 'none';

		return
	}

	tela.style.display = 'block';
	return
}

// checkar aviao no data grid
/* TESTANDO, REMOVER COMENTÁRIO DEPOIS
function checkAviao(id) {
	let aviao = document.getElementById(`aviao${id}`)
	console.log(aviao)
	if (aviao.style.backgroundColor == '') {
		aviao.style.backgroundColor = '#003552'
		return
	}

	aviao.style.backgroundColor = ''
	return
	
}
*/

// inserir avião no datagrid
function inserirAviao() {
	let coorX = document.querySelector('#coorX').value
	let coorY = document.querySelector('#coorY').value
	let coorRaio = document.querySelector('#coorRaio').value
	let coorAngulo = document.querySelector('#angulo').value
	let inputDirecao = document.querySelector('#direcao').value

	if (!((coorX == null || coorX == '') && (coorY == null || coorY == ''))) {
		cartesianoParaPolar(coorX, coorY, inputDirecao)
	}

	if (!((coorRaio == null || coorRaio == '') && (coorAngulo == null || coorAngulo == ''))) {
		polarParaCartesiano(coorRaio, coorAngulo, inputDirecao)
	}

	if (inputDirecao == null || inputDirecao == '') {
		return false
	}

	atualizarDatagrid()

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
	let msg = "Cartesiano -> Polar, Avião adicionado: " + x + " | " + y + " | " + raio + " | " + angulo
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
	let msg = "Polar -> Cartesiano, Avião adicionado: " + x + " | " + y + " | " + coorRaio + " | " + coorAngulo
	console.log(msg)
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

// atualziar registros do dg
function atualizarDatagrid() {
	let dg = document.querySelector('#tbdatagrid table')
	let svg = criarSvgCheck()

	dg.innerHTML = ""

	dg.appendChild(gerarTituloDatagrid())

	for (let i = 0; i < avioes.length; i++) {
		let tr = document.createElement('tr')
		let tdcheck = document.createElement('td')

		let incheck = document.createElement('input')

		tr.id = `aviao${i + 1}`

		tdcheck.classList.add('checkbox')

		incheck.classList.add('checkbox__input')
		incheck.type = 'checkbox'
		//incheck.onchange = checkAviao(i+1);

		tdcheck.appendChild(incheck)
		tdcheck.appendChild(svg)

		tr.appendChild(tdcheck)
		tr.appendChild(gerarColDatagrid(i))
		tr.appendChild(gerarColDatagrid(avioes[i].x))
		tr.appendChild(gerarColDatagrid(avioes[i].y))
		tr.appendChild(gerarColDatagrid(avioes[i].raio))
		tr.appendChild(gerarColDatagrid(avioes[i].angulo))
		tr.appendChild(gerarColDatagrid(avioes[i].direcao))
		dg.appendChild(tr)

	}
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

// função separada para criar o svg
function criarSvgCheck() {
	let svg = document.createElement('svg')
	let rect = document.createElement('rect')
	let path = document.createElement('path')

	svg.classList.add('checkbox__icon')

	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
	svg.setAttribute("viewBox", "0 0 22 22")

	rect.setAttribute("width", "21")
	rect.setAttribute("height", "21")
	rect.setAttribute("x", ".5")
	rect.setAttribute("y", ".5")
	rect.setAttribute("fill", "#FFF")
	rect.setAttribute("stroke", "#006F94")
	rect.setAttribute("rx", "3")

	path.classList.add("tick")

	path.setAttribute("stroke", "#6EA340")
	path.setAttribute("fill", "none")
	path.setAttribute("stroke-linecap", "round")
	path.setAttribute("stroke-width", "4")
	path.setAttribute("d", "M4 10l5 5 9-9")

	svg.appendChild(rect)
	svg.appendChild(path)

	return svg
}

// função separada para criar infos do aviao
function gerarColDatagrid(item) {
	let td = document.createElement("td")
	let p = document.createElement("p")

	p.innerText = item

	td.appendChild(p)

	return td
}