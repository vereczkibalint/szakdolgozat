const User = require('../models/User');

const {ApiError} = require('./errors/ApiError');

exports.fetchUser = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');

        return user;
    } catch (error) {
        throw new ApiError(400, 'Hiba a felhasználó lekérése során!');
    }
}

exports.login = async (credentials) => {
    try {
        const user = await User.findOne({ email: credentials.email });

        if(!user) {
            throw new ApiError(400, 'Nincs felhasználó ilyen email címmel!');
        }

        const passwordMatch = await user.comparePassword(credentials.password);

        if(!passwordMatch) {
            throw new ApiError(401, 'Hibás belépési adatok!');
        }

        const token = await user.generateJWT();

        if(!token) {
            throw new ApiError(401, 'Hibás a tokengenerálás közben!');
        }

        let response = {
            token,
            user: {
                _id: user._id,
                neptun: user.neptun,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        };

        return response;

    } catch (error) {
        throw new ApiError(400, error.message);
    }
}