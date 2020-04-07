const express = require ('express');
const City = require ('../models/citySchema');
const mongoose = require ('mongoose');

const routes = express.Router ();

//Route for GET all Cities.....

routes.get ('/', (req, res, next) => {
  City.find ()
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          count: doc.length,
          City: doc.map (docs => {
            return {
              id: docs._id,
              name: docs.CityName,
            };
          }),
        };
        res.send (response);
      } else {
        res.send ({
          message: 'City Not Exist',
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

//Route for POST Single City.....

routes.post ('/', (req, res, next) => {
  const city = new City ({
    _id: new mongoose.Types.ObjectId (),
    CityName: req.body.CityName,
  });
  city
    .save ()
    .then (city => {
      const response = {
        message: 'City Added',
        City: {
          id: city._id,
          Name: city.CityName,
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

// Route for GET Single City Hotels by using its ID.....

routes.get ('/:cityId', (req, res, next) => {
  const id = req.params.cityId;
  City.findById (id)
    .exec ()
    .then (city => {
      if (city) {
        const response = {
          message: 'City Exit',
          City: {
            id: city._id,
            name: city.CityName,
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

// routes.patch ('/:productId', (req, res, next) => {
//   const id = req.params.productId;
//   const updateOpr = {};
//   for (const op of req.body) {
//     updateOpr[op.proName] = op.value;
//   }
//   Product.update ({_id: id}, {$set: updateOpr})
//   Product.update (
//     {_id: id},
//     {$set: {name: req.body.name, price: req.body.price}}
//   )
//     .exec ()
//     .then (doc => {
//       const response = {
//         message: 'Your Prouct Updated ',
//         FindProduct: {
//           id: doc._id,
//           name: doc.name,
//           price: doc.price,
//           request: {
//             type: 'PATECH',
//             URL: 'http://localhost:3000/product/' + doc._id,
//           },
//         },
//       };
//       res.send (response);
//     })
//     .catch (err => {
//       res.send ({
//         message: err,
//       });
//     });
// });

//Route for DELETE Single Product by using its ID.....

// routes.delete ('/:productId', (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove ({_id: id})
//     .exec ()
//     .then (doc => {
//       const response = {
//         message: 'Your Prouct Deleted ',
//         request: {
//           type: 'DELETE',
//         },
//       };
//       res.send (response);
//     })
//     .catch (err => {
//       res.send ({
//         message: err,
//       });
//     });
// });

module.exports = routes;
