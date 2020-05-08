function onLoad() {

  var buttons = document.querySelectorAll('.product__add_to_cart');

  var cartBtn = document.querySelector('.cart__btn');

  var cartList = [];

  // cuando se inicia la página actualizamos el número del carrito
  if(localStorage.getItem('cartList')){
    cartList = JSON.parse(localStorage.getItem('cartList'));
  }
  cartBtn.innerText = cartList.length;


  function renderCart() {

    var total = 0;

    var cartContainer = document.querySelector('.cart__list');
    cartContainer.innerHTML = '';
    cartList.forEach(function(obj, index){
      var newItem = document.createElement('div');
      newItem.classList.add('cart__item');
      newItem.innerHTML = `
        <p class="asdasd">` + obj.name + `</p>
        <img src="${obj.img}" />
        <small>${ obj.price }</small>
        <button>eliminar</button>
      `;
      var btn = newItem.querySelector('button');
      btn.addEventListener('click', function () {
        cartList.splice(index, 1); // elimina el elemento en la lista (en memoria)
        cartBtn.innerText = cartList.length; // actualiza el número del carrito
        localStorage.setItem('cartList', JSON.stringify(cartList)); // actualiza la lista en localStorage (en HD)
        renderCart(); // volver a renderizar la lista
      });
      cartContainer.appendChild(newItem);
      total += parseInt(obj.price);
    });

    var totalElem = document.querySelector('.cart__total');
    totalElem.innerText = total;
  }
  cartBtn.addEventListener('click', renderCart);
  //renderCart();


  // agregar event listener para poner nuevos productos en el carrito
  buttons.forEach(function(elem){
    elem.addEventListener('click', function(){
      //var name = elem.parentElement.parentElement.querySelector('a').innerText;
      var name = elem.getAttribute('data-name');
      var price = elem.getAttribute('data-price');
      var id = elem.getAttribute('data-id');
      
      cartList.push({
        name: name,
        price: parseInt(price),
        id: id,
      });
      cartBtn.innerText = cartList.length;

      localStorage.setItem('cartList', JSON.stringify(cartList));

      renderCart();
    });
  });
}

window.addEventListener('load', onLoad);