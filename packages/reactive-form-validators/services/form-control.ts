import {FormGroup, AbstractControl,FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { MESSAGE, CONTROLS_ERROR, VALUE_CHANGED_SYNC } from '../const'
import { ApplicationUtil } from '../util/app-util'
import { DisableProvider } from '../domain/disable-provider';
import { RXCODE } from "../const/app.const"
export class RxFormControl extends FormControl {
    private keyName: string;
    private _errorMessage: string;
    private _errorMessages: string[] = [];
    private _disableProvider: DisableProvider;
    private _columns: string[];
    private _childColumns: any = [];
    private _parentColumns: { [key: string]: string[] };
    private _refDisableControls= [];


    get errorMessages(): string[] {
        if (this._errorMessages.length == 0 && this.errors)
            this.setControlErrorMessages();
        return this._errorMessages;
    }

    get errorMessage(): string {
        if (this._errorMessage == undefined && this.errors) {
            this.setControlErrorMessages();
        }
        return this._errorMessage;
    }
    constructor(formState: any, validator: ValidatorFn | ValidatorFn[] | null, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null, private entityObject: { [key: string]: any }, private baseObject: { [key: string]: any }, controlName: string) {
        super(formState, validator, asyncValidator)
        this.keyName = controlName;
    }

    setValue(value: any, options?: {
        dirty?: boolean;
        updateChanged?: boolean;
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        if (options && options.dirty)
            this.baseObject[this.keyName] = value;
        this.entityObject[this.keyName] = value;
        super.setValue(value, options);
        this.setControlErrorMessages();
        this.disableControl();
        if (options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]) {
            this.root[VALUE_CHANGED_SYNC]();
        }
    }

    refreshDisabled() {
        this._disableProvider = new DisableProvider();
        this._refDisableControls = this._disableProvider.zeroArgumentProcess(this,this.keyName)
        this._disableProvider.oneArgumentProcess(this,`${this.keyName}${RXCODE}1`).forEach(t=>this._refDisableControls.push(t))
        this.disableControl();
    }

    private setControlErrorMessages() {
        this._errorMessages = [];
        if (this.errors) {
            Object.keys(this.errors).forEach(t => {
                this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(this.errors, t);
                if (!this._errorMessage) {
                    let errorObject = ObjectMaker.toJson(t, undefined, [this.errors[t][t]]);
                    this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(errorObject, t);
                }
                this._errorMessages.push(this._errorMessage);
            })
        } else {
            this._errorMessage = undefined;
            this.parent[CONTROLS_ERROR][this.keyName] = undefined
            delete this.parent[CONTROLS_ERROR][this.keyName];
        }
    }

    private getErrorMessage(errorObject: { [key: string]: string }, keyName: string) {
        if (errorObject[keyName][MESSAGE])
            return errorObject[keyName][MESSAGE];
        return;
    }

    private disableControl() {
        if(this._refDisableControls)
        for(var controlDisable of this._refDisableControls){
            let control = controlDisable.isRoot ?ApplicationUtil.getControl(controlDisable.controlPath,ApplicationUtil.getRootFormGroup(this)) : ApplicationUtil.getFormControl(controlDisable.controlPath,this);
            if(control) {
                let result = controlDisable.conditionalExpression.call(control.parent["modelInstance"], control, ApplicationUtil.getParentModelInstanceValue(this), control.parent["modelInstance"])
                if (result)
                    control.disable();
                else
                    control.enable();
            }
        }
    }

}
