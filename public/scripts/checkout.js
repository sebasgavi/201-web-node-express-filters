function onLoad () {
  var typeInput = document.querySelector('[name="payment_type"]');
  var buttons = document.querySelectorAll('.btngroup__item');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function(ev){
      typeInput.value = ev.target.innerText;
      console.log('funcionando', ev.target.innerText);
    });
  });

  var form = document.querySelector('.checkoutform');
  form.addEventListener('submit', function() {
    var input = document.querySelector('.checkoutform__products');
    input.value = localStorage.getItem('cartList');
    localStorage.removeItem('cartList');
  });
}

window.addEventListener('load', onLoad);