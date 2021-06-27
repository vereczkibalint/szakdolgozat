export class UserValidator {
  neptunLengthValidator(neptunValue) : boolean {
    return neptunValue && neptunValue.length === 6;
  }

  firstNameLengthValidator(firstNameValue) : boolean {
    return firstNameValue && firstNameValue.length >= 4;
  }

  lastNameLengthValidator(lastNameValue) : boolean {
    return lastNameValue && lastNameValue.length >= 4;
  }

  passwordLengthValidator(passwordValue) : boolean {
    return passwordValue && passwordValue.length >= 8;
  }

  emailRegexValidator(emailValue) : boolean {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue));
  }
}