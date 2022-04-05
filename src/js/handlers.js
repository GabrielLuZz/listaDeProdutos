const containerProdutos = document.querySelector('.containerProdutos');
const input = document.querySelector('.containerFiltros input');
const botaoPesquisar = document.querySelector('.containerFiltros button');
const botaoTodos = document.querySelector('#botaoTodos')
const botaoHortifruit = document.querySelector('#botaoHortifruit')
const botaoPanificadora = document.querySelector('#botaoPanificadora')
const botaoLaticinios = document.querySelector('#botaoLaticinios')
const precoTotal = document.querySelector('#precoTotal');
const apagador = document.querySelector('#apagador');

const montarListaProdutos = (listaProdutos) => {


    precoTotal.innerText = `R$ ${calcularPrecoTotal(listaProdutos).toFixed(2)}`;

    if (listaProdutos.length > 0) {
        containerProdutos.classList.remove('semResultado')

        containerProdutos.innerText = '';

        listaProdutos.forEach(produto => {
            const card = document.createElement('article');
            const img = document.createElement('img');
            const titulo = document.createElement('h3');
            const secao = document.createElement('p');
            const preco = document.createElement('span');
            const botaoCarrinho = document.createElement('button');
            const imgCarrinho = document.createElement('img')

            card.classList.add('produto');
            img.src = `${produto.img}`;
            img.alt = `${produto.nome}`;
            titulo.innerText = `${produto.nome}`;
            secao.innerText = `${produto.secao}`;
            preco.innerText = `R$ ${produto.preco.toFixed(2)}`;
            imgCarrinho.src = 'src/img/carrinho.png';
            imgCarrinho.alt = 'botão do carrinho';
            botaoCarrinho.appendChild(imgCarrinho)

            card.appendChild(img)
            card.appendChild(titulo)
            card.appendChild(secao)
            card.appendChild(preco)
            card.appendChild(botaoCarrinho)

            containerProdutos.appendChild(card)
        });
    } else {
        containerProdutos.innerText = 'Sem resultados para esta pesquisa 😞';
        containerProdutos.classList.add('semResultado')
    }

}

const filtrarPorTodos = () => {
    montarListaProdutos(produtos)
    selecionarSecao(0);
}

const filtrarPorHortifruit = () => {
    const listaHortifruit = produtos.filter(({ secao }) => {
        return secao === 'Hortifruit';
    })

    montarListaProdutos(listaHortifruit)
    selecionarSecao(1);
}

const filtrarPorPanificadora = () => {
    const listaPanificadora = produtos.filter(({ secao }) => {
        return secao === 'Panificadora';
    })

    montarListaProdutos(listaPanificadora)
    selecionarSecao(2);
}

const filtrarPorLaticinios = () => {
    const listaLaticinios = produtos.filter(({ secao }) => {
        return secao === 'Laticínios';
    })

    montarListaProdutos(listaLaticinios)
    selecionarSecao(3);
}

const PesquisarProduto = (e) => {
    e.preventDefault();


    const filtro = input.value;
    input.innerText = '';

    if (filtro.length > 0) {
        const listaFiltrada = produtos.filter(({ secao, nome }) => {
            return secao.toLowerCase()
                .includes(filtro.trim().toLowerCase()) ||
                nome.toLowerCase()
                .includes(filtro.trim().toLowerCase());
        })

        montarListaProdutos(listaFiltrada)

    }


}

const calcularPrecoTotal = (listaProdutos) => {
    const precoTotal = listaProdutos.reduce((acc, { preco }) => acc + preco, 0);

    return precoTotal;
}

const selecionarSecao = (posicao) => {
    const secoes = document.querySelectorAll('.containerFiltros li');
    const selecionado = document.querySelector('.selected');

    if (selecionado) {
        selecionado.classList.remove('selected')
    }

    secoes[posicao].classList.add('selected');

}