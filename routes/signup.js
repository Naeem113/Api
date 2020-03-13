const express = require ('express');
const User = require ('../models/user');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

const routes = express.Router ();

routes.post ('/', (req, res, next) => {
  User.find ({email: req.body.email})
    .then (user => {
      console.log (user);

      if (user.length >= 1) {
        return res.status (404).json ({
          message: 'Mail already Exit',
        });
      } else {
        bcrypt.hash (req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status (500).json ({
              error: err,
            });
          } else {
            const user = new User ({
              _id: new mongoose.Types.ObjectId (),
              email: req.body.email,
              name: req.body.name,
              password: hash,
            });
            user
              .save ()
              .then (result => {
                console.log (result);
                const response = {
                  name: result.name,
                  email: result.email,
                  password: result.password,
                };
                res.send ({
                  user: response,
                  message: 'Signup Successfully',
                });
              })
              .catch (err => {
                res.send ({
                  message: 'please insert Correct email',
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

routes.get ('/', (req, res, next) => {
  User.find ()
    .select ('name email')
    .then (doc => {
      if (doc.length > 0) {
        const response = {
          Total_users: doc.length,
          users: doc.map (docs => {
            console.log (docs);

            return {
              id: docs._id,
              name: docs.name,
              email: docs.email,

              Request: {
                type: 'GET',
              },
            };
          }),
        };
        res.send (response);
      } else {
        res.send ({
          message: 'No User Exist',
        });
      }
    })
    .catch (err => {
      res.send ({
        message: err,
      });
    });
});

routes.delete ('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.remove ({_id: id})
    .exec ()
    .then (doc => {
      const response = {
        message: 'Your Account Deleted ',
        request: {
          type: 'DELETE',
        },
      };
      res.send (response);
    })
    .catch (err => {
      res.send ({
        message: 'user not exit',
        error: err,
      });
    });
});

module.exports = routes;
