const authService = require('../services/auth.services');

const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.fetchUser = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await authService.fetchUser(id);

        return res.json(user);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            let err = new ApiError(400, "Hibás belépési adatok!");
            return handleApiError(err, res);
        }

        const credentials = {
            email,
            password
        };
        const response = await authService.login(credentials);
        
        return res.json(response);
    } catch(error) {
        return handleApiError(error, res);
    }
}