import { RxFormControl } from "./form-control";
import { clone } from './entity.service';
import { RegexValidator } from '../util/regex-validator';
import { ApplicationUtil } from '../util/app-util';
import { RxFormArray } from './rx-form-array';
import { FormDataProvider } from "../domain/form-data";
import { ResetFormType } from "../enums/reset-type";
import { isResetControl, getNestedOptions } from '../util/reset-form'
import { defaultContainer } from '../core/defaultContainer'
import { AbstractControl } from "../abstract/abstract-control";
import { FormBuilderConfiguration } from "../models";
import { forEach } from "@angular-devkit/schematics";
import { formGroupContainer } from "../core/form-group.state";
import { ReactiveFormConfig, ClientLibrary } from "../util/reactive-form-config";
export class RxFormGroup extends AbstractControl {
    private baseObject: { [key: string]: any }
    private formDataProvider: FormDataProvider;
    private _submitted: boolean = false;
    private _modified: { [key: string]: any } = {};
    private _isModified: boolean = false;
    controls: { [key: string]: any };
    props: { [key: string]: any } = {};
    path: string;
    constructor(private model: any, private entityObject: { [key: string]: any }, controls: {
        [key: string]: AbstractControl;
    }, private formBuilderConfiguration: FormBuilderConfiguration) {
        super([], []);
        this.controls = controls;
        Object.keys(this.controls).forEach(t => {
            if (ReactiveFormConfig.clientLib == ClientLibrary.Vue && this.controls[t] instanceof RxFormControl)
                this.defineProperty(t)
            this.controls[t].parent = this
        });
        this.baseObject = {}
        for (var column in this.entityObject)
            this.baseObject[column] = this.entityObject[column]
        this.formDataProvider = new FormDataProvider();
    }

    bindPrimaryKey(modelInstance: any, jObject: { [key: string]: any }) {
        let instanceContainer = defaultContainer.get(modelInstance.constructor);
        if (instanceContainer && instanceContainer.properties) {
            let primaryKeyProp = instanceContainer.properties.filter(x => x.isPrimaryKey)[0];
            if (primaryKeyProp && this.modelInstance[primaryKeyProp.name])
                jObject[primaryKeyProp.name] = this.modelInstance[primaryKeyProp.name];
        }
    }

    get modifiedValue(): { [key: string]: any } {
        let jObject: any = {};
        if (Object.keys(this._modified).length > 0) {
            this.bindPrimaryKey(this.modelInstance, jObject)
            for (var columnName in this._modified) {
                if (this.controls[columnName] instanceof RxFormGroup)
                    jObject[columnName] = (<RxFormGroup>this.controls[columnName]).modifiedValue;
                else if (this.controls[columnName] instanceof RxFormArray) {
                    let formArray = this.controls[columnName] as RxFormArray;
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
        if (this.parent)
            (<RxFormGroup>this.parent).patch();
    }

    isDirty(): boolean {
        let isDirty: boolean = false;
        for (let name in this.value) {
            let currentValue = this.modelInstance[name];
            if (!(this.controls[name] instanceof RxFormGroup || this.controls[name] instanceof RxFormArray)) {
                isDirty = ApplicationUtil.notEqualTo(this.baseObject[name], currentValue);
            } else if (this.controls[name] instanceof RxFormGroup)
                isDirty = (<RxFormGroup>this.controls[name]).isDirty();
            else if (this.controls[name] instanceof RxFormArray) {
                for (let formGroup of (<RxFormArray>this.controls[name]).controls) {
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
        value?: { [key: string]: any }
    }): void {
        for (let name in this.controls) {
            if (isResetControl(name, this.controls[name], options)) {
                if (this.controls[name] instanceof RxFormGroup)
                    (<RxFormGroup>this.controls[name]).resetForm(getNestedOptions(name, options));
                else if (this.controls[name] instanceof RxFormArray) {
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
            if (this.controls[name] instanceof RxFormGroup)
                (<RxFormGroup>this.controls[name]).commit();
            else if (this.controls[name] instanceof RxFormArray) {
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
                else if (this.controls[name] instanceof RxFormArray && Array.isArray(value[name])) {
                    let index = 0;
                    for (let formGroup of (<RxFormArray>this.controls[name]).controls) {
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
            if (this.controls[columnName] instanceof RxFormGroup) {
                let error = (<RxFormGroup>this.controls[columnName]).getErrorSummary(false);
                if (Object.keys(error).length > 0)
                    jObject[columnName] = error;
            }
            else if (this.controls[columnName] instanceof RxFormArray) {
                let index = 0;
                for (let formGroup of (<RxFormArray>this.controls[columnName]).controls) {
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
            if (!(this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof RxFormGroup) && !(this.entityObject[columnName] instanceof RxFormControl) && ApplicationUtil.notEqualTo((<RxFormControl>this.controls[columnName]).getControlValue(), this.entityObject[columnName])) {
                this.controls[columnName].setValue(this.entityObject[columnName], { updateChanged: true });
            } else if ((this.controls[columnName] instanceof RxFormArray)) {
                for (let formGroup of (<RxFormArray>this.controls[columnName]).controls) {
                    (<RxFormGroup>formGroup).valueChangedSync();
                }
            } else if ((this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormGroup>this.controls[columnName]).valueChangedSync();
            }
        })
    }

    refreshDisable() {
        Object.keys(this.controls).forEach(columnName => {
            if (!(this.controls[columnName] instanceof RxFormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormControl>this.controls[columnName]).refresh();
            } else if ((this.controls[columnName] instanceof RxFormGroup)) {
                (<RxFormGroup>this.controls[columnName]).refreshDisable();
            }
        })

    }

    bindErrorMessages() {
        Object.keys(this.controls).forEach(columnName => {
            if (!(this.controls[columnName] instanceof RxFormArray || this.controls[columnName] instanceof RxFormArray) && !(this.controls[columnName] instanceof RxFormGroup)) {
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
            if (this.controls[columnName] instanceof RxFormArray) {
                let formArray = this.controls[columnName] as RxFormArray;
                for (let formGroup of formArray.controls)
                    (<RxFormGroup>formGroup).submitted = value;
            } else if (this.controls[columnName] instanceof RxFormGroup) {
                (<RxFormGroup>this.controls[columnName]).submitted = value;
            } else
                (<RxFormControl>this.controls[columnName]).bindError();
        })
    }

    get value() {
        return clone(this.entityObject);
    }

    get modelInstance() {
        return this.entityObject;
    }

    get valid() {
        return this.isValid();
    }

    get invalid() {
        return !this.isValid();
    }

    get controlsError(): { [key: string]: any } {
        return this.getErrorSummary(true);
    }

    toFormData(): FormData {
        return this.formDataProvider.convertToFormData(this.value);
    }

    get(path: string | string[]) {
        if (path == null)
            return null;
        if (!(path instanceof Array)) {
            path = path.split(".");
        }
        if (path instanceof Array && (path.length === 0))
            return null;
        let control = null;
        for (var i = 0; i < path.length; i++) {
            let name = path[i];
            if (this.controls.hasOwnProperty(name))
                control = this.controls[name];
            if (path.length > 1 && control instanceof RxFormGroup)
                control = control.get(path.slice(i + 1, path.length).join("."));
        }
        return control;
    }

    destroy() {
        formGroupContainer.destroy(this.path);
    }

    private processModified(controlName: string, control: any) {
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

    private isValid() {
        var valid = true;
        var controls = Object.keys(this.controls);
        for (var controlName of controls) {
            if (!this.controls[controlName].valid) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    private defineProperty(name: string) {
        let value = this.controls[name].value;
        Object.defineProperty(this.props, name, {
            get: () => {
                return value;
            },
            set: (v) => {
                value = v;
                this.controls[name].setValue(v);
            }
        })
    }
}
