import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function requiredValidator(message?:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue != null && controlValue != "" && controlValue != undefined) {
            if (typeof controlValue === "string")
                if (controlValue.trim() != "")
                    return null;
                else
                    return { 'required': { controlValue: "", message: message } };
            else
                return null;
        } else
            return { 'required': { controlValue: "", message: message} };
    }
}
