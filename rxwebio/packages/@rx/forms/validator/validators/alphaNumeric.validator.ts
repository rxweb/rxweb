import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

export function alphaNumericValidator(isWithWhiteSpace?: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const controlValue = control.value;

    if (controlValue) {
      var testResult = false;
      if (isWithWhiteSpace == null)
        testResult = /^[0-9A-Z]+$/i.test(controlValue);
      else
        testResult = /^[0-9A-Z\s]+$/i.test(controlValue);
      if (testResult)
        return null;
      else
        return { 'alphanumeric': null };
    }
    return null;

  }
}
