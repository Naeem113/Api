const express = require ('express');
const routes = express.Router ();
const Hotel = require ('../models/HotelSchema');
const City = require ('../models/citySchema');
const mongoose = require ('mongoose');

//Route for GET all Hotels.....

routes.get ('/', (req, res, next) => {
  Hotel.find ()
    .populate ('City_id', 'CityName')
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          count: doc.length,
          Hotels: doc.map (docs => {
            return {
              id: docs._id,
              City: docs.City_id,
              ResturentName: docs.ResturentName,
              PhoneNumber: docs.PhoneNumber,
              Website: docs.Website,
              Address: docs.Address,
              Longitude: docs.Longitude,
              Latitude: docs.Latitude,
              HotelDetail: docs.HotelDetail,
              Images: docs.Images,
              Comments: docs.comment,
            };
          }),
        };
        res.send (response);
      } else {
        res.send ({
          message: 'No Hotel Exist',
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

//Route for POST Single Hotel.....

routes.post ('/', (req, res, next) => {
  City.findById (req.body.City_id)
    .then (city => {
      const hotel = new Hotel ({
        _id: new mongoose.Types.ObjectId (),
        City_id: req.body.City_id,
        ResturentName: req.body.name,
        PhoneNumber: req.body.phone,
        Website: req.body.website,
        Address: req.body.address,
        Longitude: req.body.longitude,
        Latitude: req.body.latitude,
        HotelDetail: req.body.hotel_detail,
        Images: req.body.image,
      });
      return hotel.save ();
    })
    .then (doc => {
      const response = {
        message: 'Hotel Added',
        Hotels: {
          id: doc._id,
          City_id: doc.City_id,
          ResturentName: doc.ResturentName,
          PhoneNumber: doc.PhoneNumber,
          Website: doc.Website,
          Address: doc.Address,
          Longitude: doc.Longitude,
          Latitude: doc.Latitude,
          HotelDetail: doc.HotelDetail,
          Images: doc.Images,
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        error: err,
        message: 'Hotel Not Found',
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

// Route for GET Hotels by City ID.....

routes.get ('/:City_id', (req, res, next) => {
  const id = req.params.City_id;
  Hotel.find ({City_id: id})
    .then (hotel => {
      if (hotel.length >= 1) {
        res.send ({
          message: 'This City Contains Follwing Hotels',
          Hotels: hotel,
        });
      } else {
        res.send ({message: 'No Hotel Exist'});
      }
    })
    .catch (err => {
      res.send ({
        message: 'Please use Correct City ID',
        error: err,
      });
    });
});

// Route for GET single Hotel by using its ID.....

// routes.get ('/:hotelId', (req, res, next) => {
//   const id = req.params.hotelId;
//   Hotel.findById (id)
//     .exec ()
//     .then (hotel => {
//       if (hotel) {
//         const response = {
//           message: 'Yes Hotel Exit ',
//           Hotel: {
//             id: hotel._id,
//             City: hotel.City_id,
//             ResturentName: hotel.ResturentName,
//             PhoneNumber: hotel.PhoneNumber,
//             Website: hotel.Website,
//             Address: hotel.Address,
//             Longitude: hotel.Longitude,
//             Latitude: hotel.Latitude,
//             Images: hotel.Images,
//           },
//         };
//         res.send (response);
//       } else {
//         res.send ({message: 'Please use Correct Hotel ID'});
//       }
//     })
//     .catch (err => {
//       console.log (err);
//       res.send ({
//         error: err,
//       });
//     });
// });

//Route for DELETE Single Order by using its ID.....

// routes.delete ('/:orderId', (req, res, next) => {
//   const id = req.params.orderId;
//   Order.remove ({_id: id})
//     .exec ()
//     .then (docs => {
//       const response = {
//         message: 'Your Order Deleted ',
//         request: {
//           type: 'DELETE',
//         },
//       };
//       res.send (response);
//     })
//     .catch (err => {
//       res.send ({
//         message: 'Please use Correct Order ID',
//         error: err,
//       });
//     });
// });

module.exports = routes;
