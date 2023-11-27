function addToCartPHP(title, price, quantity, image) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('Você ja adicionou esse produto no carrinho!');
      return;
    }
  }

  var cartBoxContent = ` 
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
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
