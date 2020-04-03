// importar módulos
const express = require('express');
const exphbs = require('express-handlebars');

const products = require('./products');

const app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// /producto/:name/:id -> se utiliza para enviar la o las variables principales (leemos en req.params.name)
// ?weight_lt=4000 -> se utiliza para variables opcionales (leemos en req.query.weight_lt)

app.get('/', function (req, res) {
  console.log(req.query);

  var filtered;

  if(req.query.price_lt){
    filtered = products.filter(function (elem) {
      if(elem.price < req.query.price_lt){
        return true;
      }
    });
  }

  if(req.query.search){
    filtered = products.filter(function (elem) {
      if(elem.name.includes(req.query.search)){
        return true;
      }
    });
  }

  var context = {
    list: filtered,
  }
  res.render('list', context);
});

app.listen(3000, function(){
  console.log('app escuchando.');
});