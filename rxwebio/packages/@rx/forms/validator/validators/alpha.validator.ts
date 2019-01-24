import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

export function alphaValidator(isWithWhiteSpace?: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const controlValue = control.value;
    if (controlValue) {
      var testResult = false;
      if (isWithWhiteSpace == null)
        testResult = /^[A-Z]+$/i.test(controlValue);
      else
        testResult = /^[A-Z\s]+$/i.test(controlValue);
      if (testResult)
        return null;
      else
        return { 'alpha': null };
    }
    return null;
  }
}
