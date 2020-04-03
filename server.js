// importar módulos
const express = require('express');
const exphbs = require('express-handlebars');

const products = require('./products');

const app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  var context = {
    list: products,
  }
  res.render('list', context);
});

app.listen(3000, function(){
  console.log('app escuchando.');
});