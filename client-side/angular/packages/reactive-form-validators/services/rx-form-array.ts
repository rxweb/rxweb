import { FormArray } from "@angular/forms";
import { VALUE_CHANGED_SYNC, PATCH } from "../const/app.const";
import { isMatched, clone } from './entity.service'
import { ResetFormType } from "../enums/reset-type";
import { ObjectMaker } from '../util/object-maker'
const PROP_ARRAY: string = "propArray";
export class RxFormArray extends FormArray {
    private _baseValue: any[];
    private _isModified: boolean = false;
    private _modified: any[] = [];
    constructor(private arrayObject: any[], controls, validatorOrOpts?: any, asyncValidator?: any, private arrayConfig?: { allowMaxIndex?: number, messageKey?: string }) {
        super(controls, validatorOrOpts, asyncValidator);
        this.cloneObject(arrayObject);
    }

    get isModified() {
        return this._isModified;
    }

    push(control: any, options: {
        emitEvent?: boolean,
        isAddedInstance: boolean 
    } = { isAddedInstance: false}) {
        let formGroup: any = this.root;
        if (this.arrayObject)
            if (control.modelInstance) {
                if (!options.isAddedInstance)
                    this.arrayObject.push(control.modelInstance);
                else
                    this.arrayObject[this.arrayObject.length] = control.modelInstance
            }
            
        super.push(control);
        if (formGroup[VALUE_CHANGED_SYNC])
            formGroup.valueChangedSync()
        this.patch()
        this.checkValidation()
    }

    patch() {
        this.checkModification();
        if (this.parent)
            this.parent[PATCH]();

    }

    resetForm(options?: {
        index: number,
        groupOption: {
            resetType?: ResetFormType,
            with?: string[],
            value?: { [key: string]: any }
        },
        pushFunction: (value: Object) => boolean;
    }) {
        if (options && options.index >= 0 && options.groupOption) {
            (<any>this.controls[options.index]).resetForm(options.groupOption)
        } else {
            for (var i = 0; i < this._baseValue.length; i++) {
                if (this.controls[i] !== undefined)
                    (<any>this.controls[i]).resetForm({ value: this._baseValue[i] });
                else
                    if (options && options.pushFunction) {
                        let formGroup = options.pushFunction(this._baseValue[i]);
                        this.push(formGroup);
                    }
            }
        }
    }



    commit() {
        this._baseValue = []
        for (let formGroup of this.controls) {
            (<any>formGroup).commit();
            this._baseValue.push(clone(formGroup.value));
        }
        this.patch();
    }


    removeAt(index: number, options: { emitEvent?: boolean, isRemovedInstance?: boolean } = { isRemovedInstance: false }) {
        let formGroup: any = this.root;
        if (!options.isRemovedInstance)
            this.arrayObject.splice(index, 1);
        else {
            for (var i = index; i < this.arrayObject.length - 1; i++)
                this.arrayObject[i] = this.arrayObject[i + 1];
            this.arrayObject.pop();
        }


        super.removeAt(index,options);
        if (formGroup[VALUE_CHANGED_SYNC])
            formGroup.valueChangedSync()
        this.patch()
        this.checkValidation();
    }

    private checkValidation() {
        setTimeout(() => {
            if (this.arrayConfig != undefined && this.arrayConfig.allowMaxIndex && this.length > this.arrayConfig.allowMaxIndex)
                this.setErrors(ObjectMaker.toJson(PROP_ARRAY, this.arrayConfig, [this.length, this.arrayConfig.allowMaxIndex]));
            else if (this.errors && this.errors[PROP_ARRAY])
                delete this.errors[PROP_ARRAY];
        })
    }

    private checkModification() {
        this._isModified = !(this._baseValue.length == this.controls.length);
        if (!this._isModified)
            for (var i = 0; i < this.controls.length; i++) {
                this._isModified = isMatched(this._baseValue[i], this.controls[i].value)
                if (this._isModified)
                    break;
            }
    }

    private cloneObject(value: any[]) {
        this._baseValue = [];
        for (let row of value) {
            this._baseValue.push(clone(row));
        }
    }


}
