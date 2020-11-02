exports.topicLengthValidator = (topicValue) => {
    return topicValue && topicValue.length >= 5;
}

exports.titleLengthValidator = (titleValue) => {
    return titleValue && titleValue.length > 5;
}