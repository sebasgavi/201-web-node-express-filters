
var buttons = document.querySelectorAll('.product__add_to_cart');

var cartBtn = document.querySelector('.cart__btn');

var cartList = [];

if(localStorage.getItem('cartList')){
  cartList = JSON.parse(localStorage.getItem('cartList'));
}

cartBtn.innerText = cartList.length;

buttons.forEach(function(elem){
  elem.addEventListener('click', function(){
    //var name = elem.parentElement.parentElement.querySelector('a').innerText;
    var name = elem.getAttribute('data-name');
    var price = elem.getAttribute('data-price');
    var id = elem.getAttribute('data-id');
    
    cartList.push({
      name: name,
      price: price,
      id: id,
    });
    cartBtn.innerText = cartList.length;

    localStorage.setItem('cartList', JSON.stringify(cartList));
  });
  
});