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
/* TESTANDO, REMOVER COMENTARIO DEPOIS
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

// limpar coordenadas
function limparCampos() {
    document.querySelector('#coorX').value = ""
    document.querySelector('#coorY').value = ""
    document.querySelector('#coorRaio').value = ""
    document.querySelector('#angulo').value = ""
}

// inserir avião no datagrid
function inserirAviao() {
	let coorX = document.querySelector('#coorX').value
	let coorY = document.querySelector('#coorY').value
	let coorRaio = document.querySelector('#coorRaio').value
	let coorAngulo = document.querySelector('#angulo').value
	let inputDirecao = document.querySelector('#direcao').value
    let encontrou = false

    if (inputDirecao == null || inputDirecao == '') {
		alert("Informe uma direção")
        return false
	}

	if (!(coorX == null || coorX == '') && !(coorY == null || coorY == '')) {
		cartesianoParaPolar(coorX, coorY, inputDirecao)
        encontrou = true
	}

	if (!(coorRaio == null || coorRaio == '') && !(coorAngulo == null || coorAngulo == '')) {
		polarParaCartesiano(coorRaio, coorAngulo, inputDirecao)
        encontrou = true
	}

    if(!encontrou) {
        alert('Informe uma coordenada')
        return
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

function rotacionaAviao(){
	let angulo = document.querySelector('#anguloRotacao').value
	avioes.map((aviao) => {
        if(aviao.ativo) {
			aviao.x, aviao.y = rotacionarPonto(aviao.x, aviao.y, angulo || 0.0)
        }
    })
	atualizarDatagrid()
}

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

// atualziar registros do dg
function atualizarDatagrid() {
	let dg = document.querySelector('#tbdatagrid table')

	dg.innerHTML = ""

	dg.appendChild(gerarTituloDatagrid())

	for (let i = 0; i < avioes.length; i++) {
		let tr = document.createElement('tr')
		let tdcheck = document.createElement('td')

		let incheck = document.createElement('input')

		tr.id = `aviao${i + 1}`

		tdcheck.classList.add('checkbox')

		incheck.type = 'checkbox'
        incheck.checked = avioes[i].ativo
		
        incheck.addEventListener('change', (event) => {
            let val = event.target.checked

            avioes.map((aviao) => {
                if(aviao.id == i+1) {
                    aviao.ativo = val
                }
            })
            
        })

		tdcheck.appendChild(incheck)

		tr.appendChild(tdcheck)
		tr.appendChild(gerarColDatagrid(i+1))
		tr.appendChild(gerarColDatagrid(limitarCasasDecimais(avioes[i].x)))
		tr.appendChild(gerarColDatagrid(limitarCasasDecimais(avioes[i].y)))
		tr.appendChild(gerarColDatagrid(limitarCasasDecimais(avioes[i].raio)))
		tr.appendChild(gerarColDatagrid(limitarCasasDecimais(avioes[i].angulo)))
		tr.appendChild(gerarColDatagrid(limitarCasasDecimais(avioes[i].direcao)))
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

// função separada para criar infos do aviao
function gerarColDatagrid(item) {
	let td = document.createElement("td")
	let p = document.createElement("p")

	p.innerText = item

	td.appendChild(p)

	return td
}

// função de translandar
function transladarAviao() {
    let deslocamentoX = document.getElementById('coorXT').value
    let deslocamentoY = document.getElementById('coorYT').value

    avioes.map((aviao) => {
        if(aviao.ativo) {
            // Realiza a translação somando os deslocamentos às coordenadas existentes
            aviao.x = parseFloat(aviao.x) + parseFloat(deslocamentoX);
            aviao.y = parseFloat(aviao.y) + parseFloat(deslocamentoY);
        }
    })

    atualizarDatagrid()
}

// função para escalonar
function escalonarAviao() {
    let fatorEscalaXPercentagem = document.getElementById('coorXE').value
    let fatorEscalaYPercentagem = document.getElementById('coorYE').value
    
    avioes.map((aviao) => {
        if(aviao.ativo) {
            // Converte as porcentagens em valores decimais
            let fatorEscalaX = fatorEscalaXPercentagem / 100;
            let fatorEscalaY = fatorEscalaYPercentagem / 100;
    
            // Aplica os fatores de escala às coordenadas existentes
            aviao.x = parseFloat(aviao.x) * parseFloat(fatorEscalaX);
            aviao.y = parseFloat(aviao.y) * parseFloat(fatorEscalaY);
        }
    })

    atualizarDatagrid()
  }
  