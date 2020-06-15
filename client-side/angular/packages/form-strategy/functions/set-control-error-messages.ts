import { CONTROLS_ERROR,MESSAGE } from '../const/app.const'
import { AbstractControl } from '@angular/forms';

export function setControlErrorMessages() {
    if (!this.name)
        this.name = getFormControlName(this);
    let errors = this.cloneErrors;
    this._errorMessages = [];
    if (errors) {
        Object.keys(errors).forEach(t => {
            if (t != "languageCode") {
                if (this.parent) {
                    if (!this.parent[CONTROLS_ERROR])
                        this.parent[CONTROLS_ERROR] = {};
                    this.parent[CONTROLS_ERROR][this.name] = this._errorMessage = getErrorMessage(errors, t);
                } else
                    this._errorMessage = getErrorMessage(errors, t)
                this._errorMessages.push(this._errorMessage);
            }
        })
    } else {
        this._errorMessage = undefined;
        if (this.parent) {
            if (!this.parent[CONTROLS_ERROR])
                this.parent[CONTROLS_ERROR] = {};
            this.parent[CONTROLS_ERROR][this.name] = undefined
            delete this.parent[CONTROLS_ERROR][this.name];
        }
    }
}

function getErrorMessage(errorObject: { [key: string]: string }, keyName: string) {
    if (errorObject[keyName][MESSAGE])
        return errorObject[keyName][MESSAGE];
    return;
}

function getFormControlName(control: AbstractControl){
    let controlName: string = '';
    if (control.parent) {
        for (var formControlName in control.parent.controls) {
            if (control.parent.controls[formControlName] == control) {
                controlName = formControlName;
                break;
            }
        }
    }
    return controlName;
}