// show hidden tela
function habilitarDesabilitarTela(nome) {
	let tela = document.getElementById(`${nome}`)

	let telas = document.querySelectorAll('.container')
	
	telas.forEach((tel) => {

		tel.style.display = 'none'

		if(nome == 'rastreamento') {
			let historico = document.getElementById('historico')
			
			historico.style.display = 'block'
		}
	})

	if (tela.style.display == 'block') {
		tela.style.display = 'none';

		return
	}

	tela.style.display = 'block';

	return
}

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

function rotacionaAviao(){
	let angulo = document.querySelector('#anguloRotacao').value
	avioes.map((aviao) => {
        if(aviao.ativo) {
			aviao.x, aviao.y = rotacionarPonto(aviao.x, aviao.y, angulo || 0.0)
        }
    })
	atualizarDatagrid()
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

	desenharAviao()
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

function desenharAviao() {
	let radar = document.getElementById('radar')
	let blip = document.createElement('span')
	let circle = document.createElement('img')

	radar.innerHTML = ""

	blip.classList.add('blip')
	circle.classList.add('circle')

	radar.appendChild(blip)
	radar.appendChild(circle)

	for (let i = 0; i < avioes.length; i++) {
		let img = document.createElement('img')
		
		img.src = './cmp/imgs/aviao.svg'

		img.classList.add('av')

		// LIMITAR PARA QUE FIQUE DENTRO DO TAMANHO DO RADAR 400x400 px
		let coordenadaX = Math.max(-400, Math.min(avioes[i].x, 400));
    	let coordenadaY = Math.max(-400, Math.min(avioes[i].y, 400));

		if(coordenadaX < 0) {
			novaCoordX = (coordenadaX * -1) - 200 - 5
				
			novaCoordX *= -1
			
		} else {
			novaCoordX = coordenadaX + 200 - 5
		}

		if(coordenadaY < 0) {
			novaCoordY = (coordenadaY * -1) + 200 - 5
		} else {
			novaCoordY = coordenadaY - 200 - 5
		}

		if(novaCoordY < 0 || coordenadaY > 200) {
			novaCoordY *= -1
		}
		
		img.style.transform = 'translate(' + (novaCoordX) + 'px, ' + (novaCoordY) + 'px) rotate(' + (-avioes[i].direcao + 45) + 'deg)';

		radar.appendChild(img)
	}
}
  