const jwt = require ('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split (' ')[1];
    const decode = jwt.verify (token, process.env.JWTKEY);
    res.userData = decode;
    next ();
  } catch (error) {
    return res.send ({
      message: 'Authntication failed',
      error: error,
    });
  }
};
