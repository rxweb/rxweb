import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

export function patternValidator(pattern:string,patternType:string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const controlValue = control.value;
    var regEx = new RegExp(pattern);
    var jObject = {};
    if (controlValue) {
      if (regEx.test(controlValue))
        return null;
      else {
        if (patternType)
          jObject[patternType] = controlValue;
        else
          jObject["pattern"] = controlValue;
        return jObject;
      }
      
    }
    return null;
  }
}
