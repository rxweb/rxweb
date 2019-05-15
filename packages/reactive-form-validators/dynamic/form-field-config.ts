import { AbstractControl, FormGroup, ValidatorFn, AsyncValidatorFn } from "@angular/forms"
import { defaultContainer } from '../core/defaultContainer';
export abstract class FormFieldConfig {
    private _value: any;
    private _source: any[];
    private _formControl: AbstractControl;
    private isSetValue: boolean = true;
    constructor(fieldConfig: {[key:string]:any}) {
        this.config = fieldConfig;
        this.setActions();
    }

    private setActions() {
        if (this.config.actionKeyNames) {
            this.config.actionKeyNames.forEach(actionKey => {
                let action = defaultContainer.getActionContainer(this.constructor, actionKey);
                if (action) {
                    this.actions = action.actions;
                    Object.keys(action.actions).forEach((key) => {
                        if (action.actions[key])
                            this._actionResult[key] = action.actions[key]
                    })
                }
            })
        }
        Object.keys(this._actionResult).forEach(key => {
                if (this.config.ui && this.config.ui[key])
                    this._actionResult[key] = this.config.ui[key];
        })
    }    

    
    config: { [key: string]: any };
    inputs: any;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    onChanged: () => void;
    set formControl(value: AbstractControl) {
        this._formControl = value;
    }

    get formControl() {
        return this._formControl;
    }

    set source(value: any[]) {
        this._source = value;
    }

    get source() {
        return this._source;
    }

    private _actionResult: {
        label: string;
        placeholder: string;
        filter: any[];
        hide: boolean;
        description: string;
        disable: boolean;
    } = {
            label: '',
            placeholder: '',
            filter: [],
            hide: false,
            description: '',
            disable: false
        };

    private actions: {
        label: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => string;
        placeholder: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => string;
        filter: (config: { [key: string]: any }, source: any[], control: AbstractControl, formGroup: FormGroup) => any[];
        hide: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => boolean;
        description: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup, ) => string;
        disable: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => boolean;
    }

    setPropertyValue(value: any) {
        this.isSetValue = false;
        this.value = value;
        this.isSetValue = true;
    }

    set value(value: any) {
        this._value = value;
        if (!this.isSetValue)
            this.formControl.setValue(this._value, { isThroughDynamic:true});
    }

    get value() {
        return this._value;
    }

    disable() {
        this.formControl.disable();
    }

    enable() {
        this.formControl.enable();
    }

    set label(value: string) {
        this._actionResult.label = value;
    }

    get label(): string {
        return this._actionResult.label;
    }

    set placeholder(value: string) {
        this._actionResult.placeholder = value;
    }

    get placeholder(): string {
        return this._actionResult.placeholder;
    }

    set hide(value: boolean) {
        this._actionResult.hide = value;
    }

    get hide(): boolean {
        return this._actionResult.hide;
    }

    set description(value: string) {
        this._actionResult.description = value;
    }

    get description(): string {
        return this._actionResult.description;
    }

    refresh() {
        Object.keys(this.actions).forEach(action => {
            this._actionResult[action] = action !== "filter" ? this.actions[action](this.config, this.formControl, <FormGroup>this.formControl.parent) : this.actions[action](this.config, this.source, this.formControl, <FormGroup>this.formControl.parent)
        })
        if (this.onChanged)
            this.onChanged();
    }
}