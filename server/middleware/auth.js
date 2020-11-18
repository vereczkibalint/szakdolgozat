const jwt = require('jsonwebtoken');
const { ApiError, handleApiError } = require('../services/errors/ApiError');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    let err = new ApiError(401, 'Hiányzó token!');
    return handleApiError(err, res);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        let err = new ApiError(401, 'Hibás token!');
        return handleApiError(err, res);
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    let err = new ApiError(401, 'Hiba a token feldolgozása közben!');
    return handleApiError(err, res);
  }
};