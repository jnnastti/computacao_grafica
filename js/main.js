function habilitarDesabilitarTela(nome) {
    let tela = document.getElementById(`${nome}`)

    if(tela.style.display == 'block') {
        tela.style.display = 'none';

        return
    }

    tela.style.display = 'block';
    return
}