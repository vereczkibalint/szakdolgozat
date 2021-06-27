export class MilestoneCommentsValidator {
  bodyLengthValidator(bodyValue): boolean {
    return bodyValue.length >= 3;
  }
}