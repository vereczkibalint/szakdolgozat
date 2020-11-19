const userService = require('../services/user.services');
const { createUserFromRequest } = require('../helpers/req2model.helper');

const commonValidator = require('../models/validators/common.validators');

const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const users = await userService.fetchAll();

        return res.json(users);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const result = await userService.fetchByRole(role.toUpperCase());

        return res.json(result);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const { userId } = req.params;

        if(!commonValidator.isValidObjectId(userId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const user = await userService.fetchById(userId);

        return res.json(user);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const user = createUserFromRequest(req);
        const newUser = await userService.create(user);

        return res.json(newUser);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.import = async (req, res) => {
    // TODO
}

exports.update = async (req, res) => {
    try {
        const { userId } = req.params;
        const { _id, role } = req.user;

        if(!commonValidator.isValidObjectId(userId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        if(role !== 'ADMIN' && _id.toString() !== userId) {
            let err = new ApiError(401, 'Hozzáférés megtagadva!');
            return handleApiError(err, res);
        }

        const user = req.body;

        const updatedUser = await userService.update(userId, user);

        return res.json(updatedUser);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!commonValidator.isValidObjectId(userId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }
        
        const deletedUser = await userService.delete(userId);

        return res.json(deletedUser);
    } catch (error) {
        return handleApiError(error, res);
    }
}