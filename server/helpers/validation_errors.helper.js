exports.ProcessValidationError = (error) => {
    let errors = [];
    
    Object.values(error.errors).forEach(({properties}) => {
        errors.push({ path: properties.path, message: properties.message });
    });

    return errors;
}