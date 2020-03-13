const express = require ('express');
const Product = require ('../models/product');
const mongoose = require ('mongoose');
const checkAuth = require ('../routeAuth/checkAuth');

const routes = express.Router ();

//Route for GET all Products.....

routes.get ('/', (req, res, next) => {
  Product.find ()
    .select ('name price')
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          count: doc.length,
          Product: doc.map (docs => {
            return {
              id: docs._id,
              name: docs.name,
              price: docs.price,

              Request: {
                type: 'GET',
                URL: 'http://localhost:3000/product/' + docs._id,
              },
            };
          }),
        };
        res.send (response);
      } else {
        res.send ({
          message: 'No Product Exist',
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

//Route for POST Single Product.....

routes.post ('/', checkAuth, (req, res, next) => {
  const product = new Product ({
    _id: new mongoose.Types.ObjectId (),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save ()
    .then (product => {
      const response = {
        message: 'Prouct Created',
        createdProduct: {
          id: product._id,
          name: product.name,
          price: product.price,
          request: {
            type: 'POST',
            URL: 'http://localhost:3000/product/' + product._id,
          },
        },
      };
      res.send (response);
    })
    .catch (err => {
      console.log (err);
      res.send ({
        error: err,
      });
    });
});

//Route for GET Single Product by using its ID.....

routes.get ('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById (id)
    .exec ()
    .then (product => {
      if (product) {
        const response = {
          message: 'Your Prouct ',
          FindProduct: {
            id: product._id,
            name: product.name,
            price: product.price,
            request: {
              type: 'GET',
              URL: 'http://localhost:3000/product/' + product._id,
            },
          },
        };
        res.send (response);
      } else {
        res.send ({message: 'not valid ID'});
      }
    })
    .catch (err => {
      console.log (err);
      res.send ({
        error: err,
      });
    });
});

//Route for UPDATE Single Product by using its ID.....

routes.patch ('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  //   const updateOpr = {};
  //   for (const op of req.body) {
  //     updateOpr[op.proName] = op.value;
  //   }
  //   Product.update ({_id: id}, {$set: updateOpr})
  Product.update (
    {_id: id},
    {$set: {name: req.body.name, price: req.body.price}}
  )
    .exec ()
    .then (doc => {
      const response = {
        message: 'Your Prouct Updated ',
        FindProduct: {
          id: doc._id,
          name: doc.name,
          price: doc.price,
          request: {
            type: 'PATECH',
            URL: 'http://localhost:3000/product/' + doc._id,
          },
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

//Route for DELETE Single Product by using its ID.....

routes.delete ('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.remove ({_id: id})
    .exec ()
    .then (doc => {
      const response = {
        message: 'Your Prouct Deleted ',
        request: {
          type: 'DELETE',
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

module.exports = routes;
