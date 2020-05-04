const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

function configureRoutes (app, db) {
  // /producto/:name/:id -> se utiliza para enviar la o las variables principales (leemos en req.params.name)
  // ?weight_lt=4000 -> se utiliza para variables opcionales (leemos en req.query.weight_lt)

  // GET - Traer o leer información del servidor
  // POST - Agregar nueva información al servidor
  // PUT - Actualizar información ya existente en el servidor
  // DELETE - Borrar información del servidor

  app.get('/producto/:name/:id', function (req, res) {
    if(req.params.id.length != 24){
      res.redirect('/404');
      return;
    }

    const filter = {
      _id: {
        $eq: new ObjectId(req.params.id)
      }
    };
    // Get the documents collection
    const collection = db.collection('products');
    // Find some documents
    collection.find(filter).toArray(function(err, docs) {
      assert.equal(err, null);

      if(docs.length == 0){
        res.redirect('/404');
        return;
      }
      
      // crear el contexto
      var context = docs[0];
      // renderizar el archivo list.handlebars con el contexto creado
      res.render('product', context);
    });
  });

  app.get('/', function (req, res) {
    // imprimir todas las variables del query
    console.log(req.query);

    var filters = {
      $and: []
    };

    // si el usuario pidió filtrar por precio
    if(req.query.price_lt){
      filters.$and.push({
        price: {
          $lte: parseInt(req.query.price_lt)
        }
      });
    }

    // si el usuario pidió filtrar por precio
    if(req.query.price_gt){
      filters.$and.push({
        price: {
          $gte: parseInt(req.query.price_gt)
        }
      });
    }

    if(req.query.search){
      filters.$and.push({
        name: {
          $regex: new RegExp(req.query.search, 'i'),
        }
      });
    }

    if(filters.$and.length === 0){
      delete filters.$and;
    }


    var sortings = {};
    if(req.query.sort == 'price_desc'){
      sortings.price = -1;
    }
    if(req.query.sort == 'price_asc'){
      sortings.price = 1;
    }


    // Get the documents collection
    const collection = db.collection('products');
    // Find some documents
    collection.find(filters).sort(sortings).toArray(function(err, docs) {
      assert.equal(err, null);
      
      // crear el contexto
      var context = {
        list: docs,
      }
      // renderizar el archivo list.handlebars con el contexto creado
      res.render('list', context);
    });
    
  });

  // mostrar el formulario al usuario
  app.get('/checkout', function (req, res) {
    console.log(req.query.error);
    var context = {
      showError: req.query.error,
    }
    res.render('checkout', context);
  });

  // recibir información del usuario
  app.post('/checkout', function (req, res) {
    console.log(req.body);

    var { firstname, address } = req.body;

    req.body.creation_date = new Date();

    if(!firstname || !address){
      //res.send('error');
      res.redirect('/checkout?error=true');
      return;
    }

    const collection = db.collection('orders');
    collection.insertOne(req.body);
    //res.send('test');
    res.redirect('/confirmation');
  });

  app.get('/confirmation', function(req, res) {
    res.send('gracias por tu compra');
  });
}

module.exports = configureRoutes;