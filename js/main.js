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

