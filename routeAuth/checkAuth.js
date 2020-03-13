const jwt = require ('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const decode = jwt.verify (req.body.token, process.env.JWTKEY);
    res.userData = decode;
    next ();
  } catch (error) {
    return res.send ({
      message: 'Authntication failed',
      error: error,
    });
  }
};
