filtrarPorTodos();


botaoTodos.addEventListener('click', filtrarPorTodos)

botaoHortifruit.addEventListener('click', filtrarPorHortifruit)

botaoPanificadora.addEventListener('click', filtrarPorPanificadora)

botaoLaticinios.addEventListener('click', filtrarPorLaticinios)

botaoPesquisar.addEventListener('click', PesquisarProduto);

input.addEventListener('keyup', (e) => {
    if (input.value.length > 0) {
        apagador.style.display = 'block';
        apagador.addEventListener('click', () => {
            input.value = '';
            apagador.style.display = 'none';
        })
    } else {
        apagador.style.display = 'none';
    }

    if (e.key === 'Enter') {
        PesquisarProduto(e);
    }
})