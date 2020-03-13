const express = require ('express');
const productRoute = require ('./routes/products');
const orderRoute = require ('./routes/order');
const signupRoute = require ('./routes/signup');
const signinRoute = require ('./routes/signin');
const key = require ('./configure/key');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

mongoose.connect (key.mongoKey);
mongoose.Promise = global.Promise;

const app = express ();

app.use (morgan ('dev'));
app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());

// document.write ('WELCOME');

app.use ('/product', productRoute);
app.use ('/order', orderRoute);
app.use ('/signup', signupRoute);
app.use ('/signin', signinRoute);

app.use ((req, res, next) => {
  const error = new Error ('Not found');
  error.status = 404;
  next (error);
});

app.use ((error, req, res, next) => {
  res.status (error.status || 500);
  res.json ({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
  console.log ('server running on ' + PORT);
});
