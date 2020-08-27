import { FormGroup, FormArray, FormControl, AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { RxFormControl } from "./form-control";
import { clone } from './entity.service';
import { RegexValidator } from '../util/regex-validator';
import { ApplicationUtil } from '../util/app-util';
import { RxFormArray } from './rx-form-array';
import { FormDataProvider } from "../domain/form-data";
import { ResetFormType } from "../enums/reset-type";
import { isResetControl, getNestedOptions } from '../util/reset-form'
import { defaultContainer } from '../core/defaultContainer'
export class RxFormGroup extends FormGroup {
    private baseObject: { [key: string]: any }
    private formDataProvider: FormDataProvider;
    private _submitted: boolean;
    private _modified: { [key: string]: any } = {};
    private _isModified: boolean = false;
    changing: boolean = false;
    constructor(private model: any, private entityObject: { [key: string]: any }, controls: {
        [key: string]: AbstractControl;
    }, validatorOrOpts?: any, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
        this.baseObject = {}
        for (var column in this.entityObject)
            this.baseObject[column] = this.entityObject[column]
        this.formDataProvider = new FormDataProvider();
    }

    bindPrimaryKey(modelInstance: any, jObject: { [key: string]: any }) {
        let instanceContainer = defaultContainer.get(modelInstance.constructor);
        if (instanceContainer)
        {
            let primaryKeyProp = instanceContainer.properties.filter(x => x.isPrimaryKey)[0];
            if (primaryKeyProp && this.modelInstance[primaryKeyProp.name])
                jObject[primaryKeyProp.name] = this.modelInstance[primaryKeyProp.name];
        }
    }

    get modifiedValue(): { [key: string]: any } {
        let jObject = {};
        if (Object.keys(this._modified).length > 0) {
            this.bindPrimaryKey(this.modelInstance, jObject)
            for (var columnName in this._modified) {
                if (this.controls[columnName] instanceof RxFormGroup)
                    jObject[columnName] = (<RxFormGroup>this.controls[columnName]).modifiedValue;
                else if (this.controls[columnName] instanceof FormArray) {
                    let formArray = this.controls[columnName] as FormArray;
                    jObject[columnName] = [];
                    for (var i = 0; i < this._modified[columnName].length; i++) {
                        let modifiedValue = (<RxFormGroup>formArray.controls[i]).modifiedValue
                        if (Object.keys(modifiedValue).length > 0)
                            jObject[columnName].push(modifiedValue)
                    }
                    if (jObject[columnName].length == 0)
                        delete jObject[columnName];
                } else
                    jObject[columnName] = this._modified[columnName];
            }
            return jObject;
        }
        return this._modified;
    }

    get isModified() {
        return this._isModified;
    }

    patch(controlName?: string) {
        if (controlName) {
            let control = <RxFormControl>this.controls[controlName];
            this.processModified(controlName, control);
        } else {
            this.nestedFormsModification();
        }
        this._isModified = Object.keys(this._modified).length > 0;
        if (!this._isModified)
            this.nestedArrayIsModified();
        if (this.parent && (<RxFormGroup>this.parent).patch)
            (<RxFormGroup>this.parent).patch();
    }

    isDirty(): boolean {
        let isDirty: boolean = false;
        for (let name in this.value) {
            let currentValue = this.modelInstance[name];
            if (!(this.controls[name] instanceof FormGroup || this.controls[name] instanceof FormArray)) {
                isDirty = ApplicationUtil.notEqualTo(this.baseObject[name], currentValue);
            } else if (this.controls[name] instanceof RxFormGroup)
                isDirty = (<RxFormGroup>this.controls[name]).isDirty();
            else if (this.controls[name] instanceof FormArray) {
                for (let formGroup of (<FormArray>this.controls[name]).controls) {
                    isDirty = (<RxFormGroup>formGroup).isDirty();
                }
            }
            if (isDirty)
                break;
        }
        return isDirty;
    };

    resetForm(options?: {
        resetType?: ResetFormType,
        with?: string[],
        value?: { [key: string]:any}
    }): void {
        for (let name in this.controls) {
            if (isResetControl(name, this.controls[name], options)) {
                if (this.controls[name] instanceof FormGroup)
                    (<RxFormGroup>this.controls[name]).resetForm(getNestedOptions(name,options));
                else if (this.controls[name] instanceof FormArray) {
                    (<RxFormArray>this.controls[name]).resetForm(options && options.value ? options.value[name] : undefined);
                } else {
                    if (options && options.value && RegexValidator.isNotBlank(options.value[name]))
                        this.controls[name].reset(options.value[name]);
                    else
                        this.controls[name].reset();
                }
            }
        }
    }

    commit() {
        for (let name in this.controls) {
            if (this.controls[name] instanceof FormGroup)
                (<RxFormGroup>this.controls[name]).commit();
            else if (this.controls[name] instanceof FormArray) {
                (<RxFormArray>this.controls[name]).commit();
                
            } else {
                (<RxFormControl>this.controls[name]).commit();
            }
        }
    }

    patchModelValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        if (value) {
            for (let name in this.controls) {
                if (this.controls[name] instanceof RxFormGroup && value[name])
                    (<RxFormGroup>this.controls[name]).patchModelValue(value[name], options);
                else if (this.controls[name] instanceof FormArray && Array.isArray(value[name])) {
                    let index = 0;
                    for (let formGroup of (<FormArray>this.controls[name]).controls) {
                        if (value[name][index])
                            (<RxFormGroup>formGroup).patchModelValue(value[name][index], options);
                        index = index + 1;
                    }
                } else
                    if (value[name] !== undefined)
                        this.controls[name].patchValue(value[name], options);
            }
        }
    }


    getErrorSummary(onlyMessage: boolean): { [key: string]: any } {
        let jObject: { [key: string]: any } = {};
        Object.keys(this.controls).forEach(columnName => {
            if (this.controls[columnName] instanceof FormGroup) {
                let error = (<RxFormGroup>this.controls[columnName]).getErrorSummary(false);
                if (Object.keys(error).length > 0)
                    jObject[columnName] = error;
            }
            else if (this.controls[columnName] instanceof FormArray) {
                let index = 0;
                for (let formGroup of (<FormArray>this.controls[columnName]).controls) {
                    let error = (<RxFormGroup>formGroup).getErrorSummary(false);
                    if (Object.keys(error).length > 0) {
                        error.index = index;
                        if (!jObject[columnName])
                            jObject[columnName] = [];
                        jObject[columnName].push(error);
                    }
                    index++;
                }
            } else {
                if (this.controls[columnName].errors) {
                    let error = this.controls[columnName].errors;
                    if (onlyMessage)
                        for (let validationName in error)
                            jObject[columnName] = error[validationName].message;
                    else
                        jObject[columnName] = error;
                }
            }
        })
        return jObject;
    }

    valueChangedSync() {
        Object.keys(this.controls).forEach(columnName => {
            if (!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup) && !(this.entityObject[columnName] instanceof FormControl || this.entityObject[columnName] instanceof RxFormControl) && (<RxFormControl>this.controls[columnName]).getControlValue && ApplicationUtil.notEqualTo((<RxFormControl>this.controls[columnName]).getControlValue(), this.entityObject[columnName])) {
                this.controls[columnName].setValue(this.entityObject[columnName], { updateChanged: true });
            } else if ((this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray)) {
                for (let formGroup of (<FormArray>this.controls[columnName]).controls) {
                    (<RxFormGroup>formGroup).valueChangedSync();
                }
            } else if ((this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormGroup>this.controls[columnName]).valueChangedSync();
            }
        })
    }

    refreshDisable() {
        Object.keys(this.controls).forEach(columnName => {
            if (!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormControl>this.controls[columnName]).refresh();
            } else if ((this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormGroup>this.controls[columnName]).refreshDisable();
            }
        })

    }

    bindErrorMessages() {
        Object.keys(this.controls).forEach(columnName => {
            if (!(this.controls[columnName] instanceof FormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof FormGroup || this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormControl>this.controls[columnName]).bindError();
            } else if ((this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormGroup>this.controls[columnName]).bindErrorMessages();
            }
        })
    }

    get submitted() {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
        Object.keys(this.controls).forEach(columnName => {
            if (this.controls[columnName] instanceof FormArray) {
                let formArray = this.controls[columnName] as FormArray;
                for (let formGroup of formArray.controls)
                    (<RxFormGroup>formGroup).submitted = value;
            } else if (this.controls[columnName] instanceof FormGroup) {
                (<RxFormGroup>this.controls[columnName]).submitted = value;
            } else
                (<RxFormControl>this.controls[columnName]).bindError();
        })
    }

    get modelInstanceValue() {
        return clone(this.entityObject);
    }

    get modelInstance() {
        return this.entityObject;
    }

    get controlsError(): { [key: string]: any } {
        return this.getErrorSummary(true);
    }

    toFormData(): FormData {
        return this.formDataProvider.convertToFormData(this.value);
    }

    private processModified(controlName:string,control: any) {
        if (control.isModified)
            this._modified[controlName] = control.value;
        else
            delete this._modified[controlName];
        this._isModified = Object.keys(this._modified).length > 0;
    }

    private nestedArrayIsModified() {
        for (var controlName in this.controls) {
            if (this.controls[controlName] instanceof RxFormArray)
                this._isModified = (<RxFormArray>this.controls[controlName]).isModified;
            if (this._isModified)
                break;
        }
    }

    setBackEndErrors(errors: { [key: string]: any }) {
        Object.keys(errors).forEach(controlName => {
            if (this.controls[controlName]) {
                if (this.controls[controlName] instanceof FormGroup)
                    (<RxFormGroup>this.controls[controlName]).setBackEndErrors(errors[controlName])
                else
                    (<RxFormControl>this.controls[controlName]).setBackEndErrors(errors[controlName]);
            }
        })
    }

   clearBackEndErrors(errors?: { [key: string]: any }) {
        let clearErrors = errors ? Object.keys(errors) : Object.keys(this.controls);
        clearErrors.forEach(controlName => {
            if (this.controls[controlName]) {
                if (this.controls[controlName] instanceof FormGroup)
                    errors ? (<RxFormGroup>this.controls[controlName]).clearBackEndErrors(errors[controlName]) : (<RxFormGroup>this.controls[controlName]).clearBackEndErrors()
                else
                    errors ? (<RxFormControl>this.controls[controlName]).clearBackEndErrors(errors[controlName]) : (<RxFormGroup>this.controls[controlName]).clearBackEndErrors()
            }
        })
    }

    private nestedFormsModification() {
        for (var controlName in this.controls) {
            if (this.controls[controlName] instanceof RxFormGroup) 
                this.processModified(controlName, this.controls[controlName]);
            else if (this.controls[controlName] instanceof RxFormArray) {
                if ((<RxFormArray>this.controls[controlName]).isModified) {
                    let formGroups = (<RxFormArray>this.controls[controlName]).controls;
                    this._modified[controlName] = [];
                    for (var formGroup of formGroups) {
                        if ((<RxFormGroup>formGroup).isModified) {
                            if (!this._modified[controlName])
                                this._modified[controlName] = [];
                            this._modified[controlName].push((<RxFormGroup>formGroup).modifiedValue)
                        }

                    }
                    if (this._modified[controlName].length == 0)
                        delete this._modified[controlName];
                } else if (this._modified[controlName])
                    delete this._modified[controlName];
            }
        }
    }
}
