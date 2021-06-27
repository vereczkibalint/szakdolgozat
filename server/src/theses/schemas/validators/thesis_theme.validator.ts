export class ThesisThemeValidator {
  titleLengthValidator(titleValue) : boolean {
    return titleValue && titleValue.length >= 5;
  }
}