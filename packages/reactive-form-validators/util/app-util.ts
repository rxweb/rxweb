import { AbstractControl, FormGroup, FormArray } from "@angular/forms";

export class ApplicationUtil{
    static getParentObjectValue(control: AbstractControl) :{ [key:string]:any} {
        if (control.parent) {
            let parent = this.parentObjectValue(control.parent)
            return parent.value;
        }
        return {};
    }

    private static parentObjectValue(control: FormGroup | FormArray): FormGroup | FormArray {
        if (!control.parent)
            return control;
        else
            control = this.parentObjectValue(control.parent)
        return control
    }

    static getConfigObject(config: any): any {
        return config || {};
    }
}
