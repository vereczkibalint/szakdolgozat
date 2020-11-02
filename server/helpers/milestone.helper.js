const Milestone = require('../models/Milestone');

exports.createMilestoneFromRequest = (request) => {
    const milestone = new Milestone(request.body);

    return milestone;
}