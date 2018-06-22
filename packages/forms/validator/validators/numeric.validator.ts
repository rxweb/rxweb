import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

export function numericValidator(allowNegative: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const controlValue = control.value;
    if (controlValue != null && controlValue != "" && controlValue != undefined) {
        var regex = new RegExp(/^[0-9]+$/);
        if (allowNegative)
            regex = new RegExp(/^[-|+]?[0-9]+$/)
        if (regex.test(controlValue))
        return null;
      else
        return { 'numeric': null };
    }
    return null;
  }
}
