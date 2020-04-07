const express = require ('express');
const CityRoute = require ('./routes/city');
const HotelRoute = require ('./routes/Hotel');
const CommentsRoute = require ('./routes/comments');

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

app.use ((req, res, next) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header ('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status (200).json ({});
  }
  next ();
});

app.use ('/cities', CityRoute);
app.use ('/comments', CommentsRoute);
app.use ('/hotels', HotelRoute);

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

const PORT = process.env.PORT || 30000;

app.listen (PORT, () => {
  console.log ('server running on ' + PORT);
});
