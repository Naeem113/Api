const express = require ('express');
const routes = express.Router ();
const Hotel = require ('../models/HotelSchema');
const Comments = require ('../models/commentsSchema');
const mongoose = require ('mongoose');

//Route for GET all Hotels Comments.....

routes.get ('/', (req, res, next) => {
  Comments.find ()
    .populate ('Hotel_id', 'ResturentName')
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          count: doc.length,
          Comments: doc.map (docs => {
            return {
              id: docs._id,
              Hotel: docs.Hotel_id,
              UserName: docs.UserName,
              Rating: docs.Rating,
              Comments: docs.Comments,
              User_image: docs.User_image,
            };
          }),
        };
        res.send (response);
      } else {
        res.send ({
          message: 'No Comments Exist',
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

//Route for POST Single Hotel Comment.....

routes.post ('/', (req, res, next) => {
  Hotel.findById (req.body.Hotel_id)
    .then (hotel => {
      const comments = new Comments ({
        _id: new mongoose.Types.ObjectId (),
        Hotel_id: req.body.Hotel_id,
        UserName: req.body.usern_name,
        Rating: req.body.rating,
        Comments: req.body.comment,
        User_image: req.body.user_image,
      });
      return comments.save ();
    })
    .then (docs => {
      const response = {
        message: 'Comments Added',
        Comments: {
          id: docs._id,
          Hotel_id: docs.Hotel_id,
          UserName: docs.UserName,
          Rating: docs.Rating,
          Comments: docs.Comments,
          User_image: docs.User_image,
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        error: err,
        message: 'Not Found',
      });
    });
});

// Route for GET Single Hotel Comments by using its ID.....

// routes.get ('/:commentsId', (req, res, next) => {
//   const id = req.params.commentsId;
//   Comments.findById (id)
//     .populate ('Hotel_id', 'ResturentName')
//     .exec ()
//     .then (comments => {
//       if (comments) {
//         const response = {
//           message: 'Yes Comments Exit ',
//           Comments: {
//             id: comments._id,
//             Hotel: comments.Hotel_id,
//             UserName: comments.UserName,
//             UserAddress: comments.UserAddress,
//             Comments: comments.Comments,
//           },
//         };
//         res.send (response);
//       } else {
//         res.send ({message: 'Please use Correct Comments ID'});
//       }
//     })
//     .catch (err => {
//       console.log (err);
//       res.send ({
//         error: err,
//       });
//     });
// });

// Route for GET Comments of single Hotel by hotel ID.....

routes.get ('/:Hotel_id', (req, res, next) => {
  const id = req.params.Hotel_id;
  Comments.find ({Hotel_id: id})
    .then (comments => {
      if (comments.length >= 1) {
        res.send ({
          message: 'This Hotel Contains Follwing Comments',
          Comments: comments,
        });
      } else {
        res.send ({message: 'No Comment Exist'});
      }
    })
    .catch (err => {
      res.send ({
        message: 'Please use Correct Hotel ID',
        error: err,
      });
    });
});

module.exports = routes;
