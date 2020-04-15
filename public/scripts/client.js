
// seleccionamos el elemento select
var select = document.querySelector('select');
// agregamos el listener de cambio
select.addEventListener('change', function(ev){
  // creamos la variable url partiendo del pathname "/tienda" o la ruta en la que estemos
  var url = location.pathname;
  // le agregamos el filtro ?price_lt y el valor
  url = url + '?price_lt=' + select.value;
  // navegamos a la nueva ruta con el filtro
  location.href = url;
});

$( "#slider-range" ).slider({
  range: true,
  min: 0,
  max: 160000,
  step: 10000,
  values: [ 75, 300 ],
  slide: function( event, ui ) {
    //console.log(ui.values)
    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
  }
});

var button = document.querySelector('.searchbtn');
button.addEventListener('click', function(){
  var url = location.pathname;
  var valueA = $( "#slider-range" ).slider( "values", 0 );
  var valueB = $( "#slider-range" ).slider( "values", 1 );
  url = url + '?price_gt=' + valueA + '&price_lt=' + valueB;
  location.href = url;
});