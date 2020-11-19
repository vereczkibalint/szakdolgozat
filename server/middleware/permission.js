const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.checkPermission = (permissions) => {
  return (req, res, next) => {
    const user = req.user;

    if(!user) {
      let err = new ApiError(401, 'Autentikációs hiba!');
      return handleApiError(err, res);
    }
  
    if(!permissions.includes(user.role)) {
      let err = new ApiError(403, 'Hozzáférés megtagadva!');
      return handleApiError(err, res);
    }
  
    next();
  }
}