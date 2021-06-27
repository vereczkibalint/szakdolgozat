export class MilestonesValidator {
  titleLengthValidator(titleValue): boolean {
    return titleValue.length >= 3;
  }

  descriptionLengthValidator(descriptionValue): boolean {
    return descriptionValue.length >= 5;
  }

  deadlineDateValidator(deadlineValue): boolean {
    let today = new Date();
    return deadlineValue > today;
  }
}