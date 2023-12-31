//carrinho

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//----------JSON---------------------------------------//
let adidasJSON =
  '{"produtos":[' +
  '{"nome":"Adidas SHIRT","preço":119.99},' +
  '{"nome":"Adidas AirPods","preço":99.99},' +
  '{"nome":"Adidas CortaVento","preço":329.99},' +
  '{"nome":"Adidas Garrafa","preço":100.00},' +
  '{"nome":"Adidas Oculos","preço":129.99},' +
  '{"nome":"Adidas Cap","preço":110.00},' +
  '{"nome":"Adidas Bag","preço":219.90},' +
  '{"nome":"Adidas Tênis","preço":419.99},' +
  '{"nome":"Adidas bubble","preço":500.00},' +
  '{"nome":"Adidas Moletom","preço":219.99},' +
  '{"nome":"Adidas T-Shirt","preço":119.99},' +
  '{"nome":"Adidas T-Shirt","preço":119.99}' +
  ']}';

let p_obj = JSON.parse(adidasJSON);
console.log(p_obj.produtos);

//----------------------------------------------------//

//abre o carrinho
cartIcon.onclick = () => {
  updateCartContent();//busca o conteudo do carrinho no servidor
  cart.classList.add('active');
};
//fecha o carrinho
closeCart.onclick = () => {
  cart.classList.remove('active');
};

//
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
// Função ready
function ready() {
  // Remover itens do carrinho
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
      var button = removeCartButtons[i];
      button.addEventListener('click', removeCartItem);
  }

  // Mudar a quantidade
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
  }

  // Adicionar produtos ao carrinho
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener('click', addCartClicked);
  }

  // Botão de compra funcional
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Verificar o estado de carregamento do documento
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

//ADICIONA NO CARRINHO
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  // Send data to PHP to add to the cart
  addToCartPHP(title, price, 1, productImg);

  updateTotal();
}

//adiciona carrinho usando o PHP
function addToCartPHP(title, price, quantity, image) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'cart.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
      }
  };
  xhr.send('action=add&title=' + encodeURIComponent(title) + '&price=' + encodeURIComponent(price) +
      '&quantity=' + encodeURIComponent(quantity) + '&image=' + encodeURIComponent(image));
}

//Busca o carrinho do servidor
function updateCartContent(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'cart.php', true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var cartContent = document.getElementsByClassName('cart-content')[0];
      cartContent.innerHTML = xhr.responseText;
      attachCartEventListerners();
    }
  };
  xhr.send('action=get')
}
//Função
function attachCartEventListerners() {
  //Remover intens do carrinho
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  //mudando a quantidade
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  // adicionado os produtos no carrinho
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
  //botão de compra funcional
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}
//botão de compra
function buyButtonClicked() {
  alert('Seu pedido foi Finalizado!');
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//mudando a quantidade
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//adicionando no carrinho

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  // Ensure productImg is defined
  if (productImg) {
      // Send data to PHP to add to the cart
      addToCartPHP(title, price, 1, productImg);

      updateTotal();
  } else {
      console.error('productImg is not defined');
  }
}
//Função para adicionar para o carrinho usando PHP
function addToCartPHP(title, price, quantity, image) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'cart.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
      }
  };
  
  // Use encodeURIComponent to handle special characters in the URL parameters
  var params = 'action=add&title=' + encodeURIComponent(title) +
               '&price=' + encodeURIComponent(price) +
               '&quantity=' + encodeURIComponent(quantity) +
               '&image=' + encodeURIComponent(image);

  xhr.send(params);
  
}
function updateCartContent(productDetails) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');

  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == productDetails.title) {
      alert('Você já adicionou esse produto no carrinho!');
      return;
    }
  }

  var cartBoxContent = ` 
    <img src="${productDetails.image}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${productDetails.title}</div>
      <div class="cart-price">${productDetails.price}</div>
      <input type="number" value="${productDetails.quantity}" class="cart-quantity">
    </div>  
    <!--Remover do carrinho-->
    <i class='bx bxs-trash-alt cart-remove'></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);

  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

//subindo o total

function updateTotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('R$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //caso o preço tennha alguns centavos
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('total-price')[0].innerText = 'R$' + total;
}
