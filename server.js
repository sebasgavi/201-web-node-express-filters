// importar módulos
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('list');
});


app.listen(3000, function(){
  console.log('app escuchando.');
});