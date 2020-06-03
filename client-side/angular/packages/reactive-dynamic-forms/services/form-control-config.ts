import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"
import {  Hooks} from "../models/interface/action-config"

import { BaseFormControlConfig } from './base-form-control-config'
import { RxFormControl } from "@rxweb/reactive-form-validators";
import { dynamicContainer } from "../core/dynamicContainer";


export abstract class FormControlConfig extends BaseFormControlConfig {
    private _formControl: RxFormControl;

    constructor(fieldConfig: { [key: string]: any }, public controlsConfig: { [key: string]: FormControlConfig },notificationId:number) {
        super(controlsConfig, notificationId);
        this.config = fieldConfig;
       this.overrideProperty();
        this.value = fieldConfig.value;
        super.checkFilterFunction();
        this.props = this.config.props || Object.create({});
        this.setNotification();
    }

    private overrideProperty(){
        if(this.config.overrideProps){
            this.config.overrideProps.forEach(t=>{
                let propInfo = dynamicContainer.getOverrideProp(t);
                this.overrideProp(propInfo);
            })
        }
    }

    overrides:any = {};

    
    inputs: any;
    events: any;

    value: any;
    disabled: boolean;
    label: string;
    img: string;
    placeholder: string;
    hide: boolean;
    description: string;
    focus: boolean;
    readonly: boolean;
    class: string[];

    isPlainTextMode: boolean;
    
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;

    hooks: Hooks


    set formControl(value: RxFormControl) {
        this._formControl = value;
        setTimeout(() => this.overrideErrorsProp(this._formControl), 10);
    }

    get formControl() {
        return this._formControl;
    }

    get errorMessage(): string {
        return this.formControl.errorMessage;
    }

    get prependText() {
        return this.config.ui ? this.config.ui.prependText : '';
    }
}

export class ControlConfig extends FormControlConfig {
    constructor(fieldConfig: { [key: string]: any }, controlsConfig: { [key: string]: FormControlConfig }) {
        super(fieldConfig, controlsConfig, 0);
    }
}