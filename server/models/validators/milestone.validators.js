exports.titleLengthValidator = (titleValue) => {
    return titleValue && titleValue.length >= 3;
}

exports.descriptionLengthValidator = (descriptionValue) => {
    return descriptionValue && descriptionValue.length >= 5;
}

exports.deadlineDateValidator = (deadlineValue) => {
    let today = new Date();

    return deadlineValue && deadlineValue > today;
}