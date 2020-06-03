import { RxFormGroup } from "../services/rx-form-group";
import { FormControlDirective } from "./form-control-directive";
import { RxFormControl } from "../services/form-control";

export class FormGroupDirective {

    private _formControls: FormControlDirective[] = new Array<FormControlDirective>();
    private _formGroups: FormGroupDirective[] = new Array<FormGroupDirective>();

    constructor(private element: any, private formGroup: RxFormGroup) {
        this.map();
    }

    map() {
        var childFormControls = this.element.querySelectorAll(`[form-control-path^="${this.formGroup.path}"]`) as NodeList;
        if (childFormControls) {
            childFormControls.forEach((t: any) => {
                var formControlName = t.getAttribute("form-control-path");
                let control = this.formGroup.get(formControlName);
                if (control instanceof RxFormControl) {
                    var formControl = new FormControlDirective(t, control);
                    this._formControls.push(formControl);
                } 
            })
        }
    }

    destroy() {
        this._formControls.forEach(t => {
            t.destroy();
        });
        Object.keys(this.formGroup.controls).forEach(t => {
            if (this.formGroup.controls[t] instanceof RxFormGroup)
                this.formGroup.controls[t].destroy();
        })
    }
}