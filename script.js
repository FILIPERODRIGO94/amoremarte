const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const listaCarrinho = document.getElementById('lista-carrinho');
const totalEl = document.getElementById('total');
const contador = document.getElementById('contador');

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, preco) {
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  salvarCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

function alterarQuantidade(index, novaQtd) {
  novaQtd = parseInt(novaQtd);
  if (novaQtd <= 0) {
    removerDoCarrinho(index);
  } else {
    carrinho[index].quantidade = novaQtd;
    salvarCarrinho();
    atualizarCarrinho();
  }
}

function limparCarrinho() {
  carrinho.length = 0;
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;
  let mensagem = '*Pedido Amor em Arte:*\n';

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)} x 
      <input type="number" min="1" value="${item.quantidade}" onchange="alterarQuantidade(${index}, this.value)">
      = R$ ${subtotal.toFixed(2)}
      <button class="remover-item" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
    mensagem += `• ${item.nome} x ${item.quantidade} - R$ ${subtotal.toFixed(2)}\n`;
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
  contador.textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);

  mensagem += `\n*Total:* R$ ${total.toFixed(2)}`;
  
  const numeroWhatsApp = '5585991503775';
  const mensagemCodificada = encodeURIComponent(mensagem);
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
  
  const link = document.getElementById('link-whatsapp');
  if (link) {
    link.href = urlWhatsApp;
  }
}

// Inicializa o carrinho salvo ao carregar
atualizarCarrinho();
// Botão hamburguer abre/fecha menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('active');
});

// Fecha menu ao clicar em um item (opcional e recomendado)
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('active');
  });
});


