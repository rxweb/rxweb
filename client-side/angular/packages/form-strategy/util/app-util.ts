import { FormGroup } from "../interface/form-group";
import { AbstractControl } from "@angular/forms";
import { FormControl } from "../interface/form-control";

export class ApplicationUtil {

    static rootFormGroup(control: AbstractControl): FormGroup {
        if (control.parent) {
            return this.rootFormGroup(control.parent);
        }
        return <FormGroup>control;
    }

    static getControl(fieldName: string, formGroup: FormGroup): FormControl {
        let splitText = fieldName.split('.');
        if (splitText.length > 1) {
            var formControl: any = this.rootFormGroup(formGroup);
            splitText.forEach((name, index) => { formControl = formControl.controls[name] })
            return formControl;
        } else
            return formGroup.controls[fieldName] as FormControl;

    }

}