// importar módulos
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const exphbs = require('express-handlebars');

// 
const configureRoutes = require('./routes');

// crear servidor
const app = express();

app.use(express.urlencoded({ extended: true }));

// configurar carpeta pública
app.use(express.static('public'));

// configurar handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'store';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  configureRoutes(app, db);
});

// iniciar servidor en puerto 3000
app.listen(3000, function(){
  console.log('app escuchando.');
});