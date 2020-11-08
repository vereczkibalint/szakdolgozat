class ApiError extends Error {
    constructor(statusCode, message, errors = [], ...params) {
        super(...params)
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}

const handleApiError = (err, res) => {
    const { statusCode, message, errors } = err;
    res.status(statusCode).json({
        message,
        errors
    });
}

module.exports = {
    ApiError,
    handleApiError
};