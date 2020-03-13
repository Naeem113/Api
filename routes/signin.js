const express = require ('express');
const User = require ('../models/user');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const key = require ('../configure/key');

const routes = express.Router ();

routes.post ('/', (req, res, next) => {
  User.find ({email: req.body.email})
    .then (user => {
      if (user.length < 1) {
        return res.status (404).json ({
          message: 'Autnentication failed',
        });
      }
      bcrypt.compare (req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status (500).json ({
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign (
            {
              name: user[0].name,
              email: user[0].email,
              userId: user[0]._id,
              password: user[0].password,
            },
            key.JWTKEY,
            {
              expiresIn: '1h',
            }
          );
          return res.status (202).json ({
            message: 'Autnentication Successful',
            token: token,
          });
        }
        res.status (401).json ({
          message: 'Autnentication failed',
        });
      });
    })
    .catch (err => {
      res.send ({
        error: err,
      });
    });
});

module.exports = routes;
