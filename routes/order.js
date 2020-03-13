const express = require ('express');
const routes = express.Router ();
const Order = require ('../models/orderData');
const Product = require ('../models/product');
const mongoose = require ('mongoose');
const checkAuth = require ('../routeAuth/checkAuth');

//Route for GET all ORDER.....

routes.get ('/', checkAuth, (req, res, next) => {
  //Route for DELETE Single Product by using its ID.....
  Order.find ()
    .populate ('product', 'name')
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          count: doc.length,
          Orders: doc.map (docs => {
            return {
              id: docs._id,
              product: docs.product,
              quantity: docs.quantity,

              Request: {
                type: 'GET',
                URL: 'http://localhost:3000/order/' + docs._id,
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

//Route for POST Single Order.....

routes.post ('/', checkAuth, (req, res, next) => {
  Product.findById (req.body.productId)
    .then (product => {
      const order = new Order ({
        _id: new mongoose.Types.ObjectId (),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save ();
    })
    .then (doc => {
      const response = {
        message: 'Your Order Submitted ',
        Order: {
          id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'POST',
            URL: 'http://localhost:3000/order/' + doc._id,
          },
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        message: 'Product Not Found',
        error: err,
      });
    });
});

// routes.post ('/', (req, res, next) => {
//     const order = new Order ({
//       _id: new mongoose.Types.ObjectId (),
//       product: req.body.productId,
//       quantity: req.body.quantity,
//     });
//     order
//       .save ()
//       .then (doc => {
//         const response = {
//           message: 'Your Order Submitted ',
//           Order: {
//             id: doc._id,
//             product: doc.product,
//             quantity: doc.quantity,
//             request: {
//               type: 'POST',
//               URL: 'http://localhost:3000/order/' + doc._id,
//             },
//           },
//         };
//         res.send (response);
//       })
//       .catch (err => {
//         res.send ({
//           error: err,
//         });
//       });
//   });

//Route for GET Single Order by using its ID.....

routes.get ('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId;
  Order.findById (id)
    .populate ('product')
    .exec ()
    .then (order => {
      if (order) {
        const response = {
          message: 'Your Order ',
          Order: {
            id: order._id,
            quantity: order.quantity,
            product: order.product,

            request: {
              type: 'GET',
              URL: 'http://localhost:3000/order/' + order._id,
            },
          },
        };
        res.send (response);
      } else {
        res.send ({message: 'Please use Correct Order ID'});
      }
    })
    .catch (err => {
      console.log (err);
      res.send ({
        error: err,
      });
    });
});

//Route for DELETE Single Order by using its ID.....

routes.delete ('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId;
  Order.remove ({_id: id})
    .exec ()
    .then (docs => {
      const response = {
        message: 'Your Order Deleted ',
        request: {
          type: 'DELETE',
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        message: 'Please use Correct Order ID',
        error: err,
      });
    });
});

module.exports = routes;
