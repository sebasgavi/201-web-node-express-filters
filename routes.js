const assert = require('assert');

function configureRoutes (app, db) {
  // /producto/:name/:id -> se utiliza para enviar la o las variables principales (leemos en req.params.name)
  // ?weight_lt=4000 -> se utiliza para variables opcionales (leemos en req.query.weight_lt)

  app.get('/producto/:name/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var product = products[id];

    res.render('product', product);
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
}

module.exports = configureRoutes;