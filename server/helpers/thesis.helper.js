const Thesis = require('../models/Thesis');

exports.createThesisFromRequest = (request) => {
    const thesis = new Thesis(request.body);

    return thesis;
}