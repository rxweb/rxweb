import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const controlValue = control.value;
    if (controlValue) {
      if (/^[0-9]+$/i.test(controlValue))
        return null;
      else
        return { 'numeric': null };
    }
    return null;
  }
}
