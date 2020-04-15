// importar módulos
const express = require('express');
const exphbs = require('express-handlebars');

// importar productos
const products = require('./products');

// crear servidor
const app = express();

// configurar carpeta pública
app.use(express.static('public'));

// configurar handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// /producto/:name/:id -> se utiliza para enviar la o las variables principales (leemos en req.params.name)
// ?weight_lt=4000 -> se utiliza para variables opcionales (leemos en req.query.weight_lt)

app.get('/', function (req, res) {
  // imprimir todas las variables del query
  console.log(req.query);

  // arreglo filtrado
  var filtered = products;

  // si el usuario pidió filtrar por precio
  if(req.query.price_lt){
    // creo la copia del arreglo filtrado
    filtered = filtered.filter(function (elem) {
      // si el precio del elemento es menor al precio que el usuario preguntó
      if(elem.price <= req.query.price_lt){
        return true;
      }
    });
  }

  // si el usuario pidió filtrar por precio
  if(req.query.price_gt){
    // creo la copia del arreglo filtrado
    filtered = filtered.filter(function (elem) {
      // si el precio del elemento es menor al precio que el usuario preguntó
      if(elem.price >= req.query.price_gt){
        return true;
      }
    });
  }

  if(req.query.search){
    filtered = filtered.filter(function (elem) {
      // si el nombre del producto incluye lo que el usuario buscó
      if(elem.name.includes(req.query.search)){
        return true;
      }
    });
  }

  // crear el contexto
  var context = {
    list: filtered,
  }
  // renderizar el archivo list.handlebars con el contexto creado
  res.render('list', context);
});

// iniciar servidor en puerto 3000
app.listen(3000, function(){
  console.log('app escuchando.');
});