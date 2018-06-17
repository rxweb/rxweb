import { FormGroup,
    FormBuilder,
    Validators,
    Validator,
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function compareValidator(compareFieldName: string, controlLabel:string): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        const compareControl = control.root.get([compareFieldName]);
        const controlValue = control.value;
        if (compareControl && compareControl.value === control.value) {
            if (compareControl.status === "INVALID")
                compareControl.updateValueAndValidity();
            return null;
        }
        return { 'compare': { controlLabel: controlLabel } };
    }
}