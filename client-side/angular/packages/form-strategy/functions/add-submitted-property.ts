import { FormGroup, FormArray } from "@angular/forms";
import { AppFormGroup } from "../interface/i-form-group";
const SUBMITTED: string = "submitted";
export function addSubmittedProperty() {
    Object.defineProperty(FormGroup.prototype, SUBMITTED, {
        get: function () {
            return this._submitted
        },
        set: function (value) {
            this._submitted = value;
            Object.keys(this.controls).forEach(columnName => {
                if (this.controls[columnName] instanceof FormArray) {
                    let formArray = this.controls[columnName] as FormArray;
                    for (let formGroup of formArray.controls)
                        (<AppFormGroup<any>>formGroup).submitted = value;
                } else if (this.controls[columnName] instanceof FormGroup) {
                    (<AppFormGroup<any>>this.controls[columnName]).submitted = value;
                } else {
                    let t = this.controls[columnName].errors;
                }
            })
        },
        enumerable: true,
        configurable: true
    });
}