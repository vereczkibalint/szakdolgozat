export class ThesisValidator {
  titleLengthValidator(titleValue) : boolean {
    return titleValue && titleValue.length >= 5;
  }
}