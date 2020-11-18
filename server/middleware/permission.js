const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) {
    let err = new ApiError(401, 'Autentikációs hiba!');
    return handleApiError(err, res);
  }

  if(user.role !== 'ADMIN') {
    let err = new ApiError(403, 'Hozzáférés megtagadva!');
    return handleApiError(err, res);
  } else {
      next();
  }
};

exports.isLecturer = (req, res, next) => {
  const user = req.user;
  
  if (!user) {
    let err = new ApiError(401, 'Autentikációs hiba!');
    return handleApiError(err, res);
  }

  if(user.role !== 'LECTURER') {
    let err = new ApiError(403, 'Hozzáférés megtagadva!');
    return handleApiError(err, res);
  } else {
      next();
  }
};

exports.isStudent = (req, res, next) => {
  const user = req.user;
  
  if (!user) {
    let err = new ApiError(401, 'Autentikációs hiba!');
    return handleApiError(err, res);
  }

  if(user.role !== 'STUDENT') {
    let err = new ApiError(403, 'Hozzáférés megtagadva!');
    return handleApiError(err, res);
  } else {
      next();
  }
};