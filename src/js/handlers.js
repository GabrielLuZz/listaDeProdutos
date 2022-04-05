//variáveis

const containerProdutos = document.querySelector('.containerProdutos');
const input = document.querySelector('.containerFiltros input');
const botaoPesquisar = document.querySelector('.containerFiltros button');
const botaoTodos = document.querySelector('#botaoTodos')
const botaoHortifruit = document.querySelector('#botaoHortifruit')
const botaoPanificadora = document.querySelector('#botaoPanificadora')
const botaoLaticinios = document.querySelector('#botaoLaticinios')
const precoTotal = document.querySelector('#precoTotal');
const apagador = document.querySelector('#apagador');
const areaCarrinho = document.querySelector('.carrinho');
const minimizador = document.querySelector('.minimizador');
const areaItens = document.querySelector('.carrinhoItens');
const quantidadeCarrinho = document.querySelector('.amount .second');
const totalCarrinho = document.querySelector('.total .second');
const abrirCarrinho = document.querySelector('.abrir');

const carrinho = [];




//filtragem

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
        const listaFiltrada = produtos.filter(({ secao, nome, categoria }) => {
            return secao.toLowerCase()
                .includes(filtro.trim().toLowerCase()) ||
                nome.toLowerCase()
                .includes(filtro.trim().toLowerCase()) ||
                categoria.toLocaleLowerCase()
                .includes(filtro.trim().toLowerCase());
        })

        montarListaProdutos(listaFiltrada)

    }


}

const montarListaProdutos = (listaProdutos) => {


    precoTotal.innerText = `R$ ${calcularPrecoTotal(listaProdutos).toFixed(2)}`;

    // <article class="produto">

    //     <section class="top">
    //         <img src="./src/img/banana.png" alt="Banana">
    //     </section>

    //     <section class="bottom">

    //         <section class="left">
    //             <h3>Banana</h3>
    //             <p>Hortifruit</p>
    //             <span>R$ 4.00</span>
    //         </section>

    //         <section class="right">
    //             <ul>
    //                 <li>vitamina</li>
    //                 <li>vitamina</li>
    //                 <li>vitamina</li>
    //                 <li>vitamina</li>
    //             </ul>
    //             <button><img src="src/img/carrinho.png" alt="botão do carrinho"></button>
    //         </section>

    //     </section>


    // </article>

    if (listaProdutos.length > 0) {
        containerProdutos.classList.remove('semResultado')

        containerProdutos.innerText = '';

        listaProdutos.forEach(produtoArray => {
            let produto = {...produtoArray };
            const card = document.createElement('article');
            const top = document.createElement('section');
            const bottom = document.createElement('section');
            const bottomLeft = document.createElement('section');
            const bottomRight = document.createElement('section');
            const lista = document.createElement('ul');
            const img = document.createElement('img');
            const titulo = document.createElement('h3');
            const secao = document.createElement('p');
            const preco = document.createElement('span');
            const botaoCarrinho = document.createElement('button');
            const imgCarrinho = document.createElement('img');


            card.classList.add('produto');
            top.classList.add('top');
            bottom.classList.add('bottom');
            bottomLeft.classList.add('left');
            bottomRight.classList.add('right');
            img.src = `${produto.img}`;
            img.alt = `${produto.nome}`;
            titulo.innerText = `${produto.nome}`;
            secao.innerText = `${produto.secao}`;
            preco.innerText = `R$ ${produto.preco.toFixed(2)}`;
            imgCarrinho.src = 'src/img/carrinho.png';
            imgCarrinho.alt = 'botão do carrinho';

            botaoCarrinho.appendChild(imgCarrinho)

            produto.componentes.forEach(componente => {
                const item = document.createElement('li');

                item.innerText = componente;

                lista.appendChild(item);
            })

            bottomLeft.appendChild(titulo)
            bottomLeft.appendChild(secao)
            bottomLeft.appendChild(preco)


            bottomRight.appendChild(lista)
            bottomRight.appendChild(botaoCarrinho)


            top.appendChild(img)
            bottom.appendChild(bottomLeft)
            bottom.appendChild(bottomRight)

            card.appendChild(top)
            card.appendChild(bottom)


            botaoCarrinho.addEventListener('click', () => adicionarCarrinho(produto))

            containerProdutos.appendChild(card)
        });
    } else {
        containerProdutos.innerText = 'Sem resultados para esta pesquisa 😞';
        containerProdutos.classList.add('semResultado')
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


//carrinho

const adicionarCarrinho = (produto) => {

    if (carrinho.findIndex(item => item.id === produto.id) === -1) {
        produto.noCarrinho = 0;
        produto.noCarrinho++;
        carrinho.push(produto)

        atualizarCarrinho()
    }
}

const removerCarrinho = (produto) => {
    const index = carrinho.findIndex(item => item.id === produto.id);
    carrinho[index].noCarrinho = 0;

    carrinho.splice(index, 1)

    atualizarCarrinho();
}

const incrementarNoCarrinho = (produto) => {
    const index = carrinho.findIndex(item => item.id === produto.id);
    carrinho[index].noCarrinho++;

    atualizarCarrinho();

}

const diminuirNoCarrinho = (produto) => {
    const index = carrinho.findIndex(item => item.id === produto.id);
    carrinho[index].noCarrinho--;

    if (carrinho[index].noCarrinho === 0) {
        removerCarrinho(produto);
    }

    atualizarCarrinho();
}

const montarItensCarrinho = () => {
    if (carrinho.length > 0) {

        areaItens.innerText = '';

        carrinho.forEach(produto => {
            const item = document.createElement('div');


            item.classList.add('item');

            item.innerHTML = `
                <div class="picture">
                    <img src="${produto.img}" alt="${produto.nome}">
                </div>
                <div class="info">
                    <h2>${produto.nome}</h2>
                    <span>${produto.secao}</span>
                    <button>🗑️</button>
                </div>
                <div class="acoes">
                    <div class="carrinhoItemQtArea">
                        <button class="cart--item-qtmenos">-</button>
                        <div class="carrinhoItemQt">${produto.noCarrinho}</div>
                        <button class="cart--item-qtmais">+</button>
                    </div>
                    <span>R$ ${produto.preco.toFixed(2)}</span>

                </div>`;

            item.querySelector('.info button').addEventListener('click', () => removerCarrinho(produto))

            item.querySelector('.cart--item-qtmenos').addEventListener('click', () => diminuirNoCarrinho(produto));

            item.querySelector('.cart--item-qtmais').addEventListener('click', () => incrementarNoCarrinho(produto))

            areaItens.appendChild(item);
        });
    }
}

const atualizarCarrinho = () => {


    if (carrinho.length > 0) {
        areaCarrinho.classList.add('carrinhoAberto');
        abrirCarrinho.classList.remove('aparece');
    } else {
        areaCarrinho.classList.remove('carrinhoAberto');
    }

    montarItensCarrinho()


    let quantidade = carrinho.reduce((acc, { noCarrinho }) => acc + noCarrinho, 0);
    quantidadeCarrinho.innerText = `${quantidade}`;

    let total = carrinho.reduce((acc, { noCarrinho, preco }) => {
        let precoTotal = noCarrinho * preco;

        return acc + precoTotal;
    }, 0);
    totalCarrinho.innerText = `${total}`;




}