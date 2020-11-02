exports.ProcessValidationError = (error) => {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });

    let err = new Error('Hiba az oktató létrehozása közben!');
    err.errors = errors;

    return err;
}