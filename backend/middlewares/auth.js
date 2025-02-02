const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {

    return res
      .status(401)
      .send({ message: 'Autorização é necessária' });
  }


  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, '2222');
  } catch (e) {

    const err = new Error('Não autorizado');
    err.statusCode = 403;

    console.error(e);

    next(err);
  }

  req.user = payload;

  next();
};