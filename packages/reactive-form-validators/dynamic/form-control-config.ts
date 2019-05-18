import { AbstractControl,  ValidatorFn, AsyncValidatorFn } from "@angular/forms"
import { defaultContainer } from '../core/defaultContainer';
import { ActionFnConfig,Hooks } from "../models/config/action-config"
const SOURCE: string = "source";
const FILTER: string = "filter";
const HIDE: string = "hide";

export abstract class FormControlConfig {
    private _value: any;
    private _source: any[];
    private _formControl: AbstractControl;

    constructor(fieldConfig: { [key: string]: any }, private fieldConfigModel: { [key: string]: FormControlConfig}) {
        this.config = fieldConfig;
        this.setNotifications();
        this.setActions();
        if (!this.actions.filter && this.config.source)
            this.source = this.config.source;
    }
    
    config: { [key: string]: any };
    inputs: any;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    onHide: () => void;
    hooks: Hooks
    actions: ActionFnConfig


    set formControl(value: AbstractControl) {
        this._formControl = value;
    }

    get formControl() {
        return this._formControl;
    }

    set source(value: any[] | Promise<any[]>) {
        if (Array.isArray(value))
            this._source = value;
        else
            <Promise<any[]>>value.then(x => this._source = x);
    }

    get source()  {
        return this._source;
    }
    
    set value(value: any) {
        this._value = value;
        this.refresh();
    }

    get value() {
        return this._value;
    }

    set disable(value: boolean) {
        if (value)
            this.formControl.disable();
        else
            this.formControl.enable();
        this._actionResult.disable = value;
    }

    get disable() {
        return this._actionResult.disable;
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

    complete() {
        for (let action in this.controlNotifications)
            for (let columnName in this.fieldConfigModel) {
                if (this.fieldConfigModel[columnName].actions[action]) {
                    let stringFunction = String(this.fieldConfigModel[columnName].actions[action]);
                    if (stringFunction.indexOf(`.${this.config.name}`) != -1 || stringFunction.indexOf(`.${this.config.name};`) != -1) {
                        this.controlNotifications[action].push(columnName);
                    }
                }
            }
        this.updateActionValue();
    }

    refresh(actionName?: string) {
        for (var columnName in this.controlNotifications) {
            if (this.controlNotifications[columnName].length > 0)
                this.controlNotifications[columnName].forEach(x => {
                    if (x != this.config.name)
                        this.fieldConfigModel[x].refresh(columnName);
                    else
                        this.setActionValue(columnName);
                })
        }
        if (actionName)
            this.setActionValue(actionName);
    }

    private setActionValue(actionName:string) {
        this[actionName == FILTER ? SOURCE : actionName] = this.actions[actionName].call(this);
        if (this.onHide && actionName == HIDE)
            this.onHide();
    }

    private updateActionValue() {
        Object.keys(this.controlNotifications).forEach(key => {
            if (this.config.ui && this.config.ui[key])
                this[key] = this.config.ui[key];
            else if (this.actions[key])
                this[key] = this.actions[key].call(this);
        })
    }
   

    private setNotifications() {
        this.controlNotifications = { all: [], filter: [], disable: [], label: [], description: [], hide: [], placeholder: [] }
        if (this.config.controlNotifications)
            for (var columnName in this.controlNotifications)
                if (this.config.controlNotifications[columnName])
                    this.config.controlNotifications[columnName].forEach(x => this.controlNotifications[columnName].push(x));
    }

    private setActions() {
        this.actions = {};
        this.hooks = {};
        if (this.config.actionKeyNames) {
            this.config.actionKeyNames.forEach(actionKey => {
                let action = defaultContainer.getActionContainer(this.constructor, actionKey);
                if (action) {
                    if (action.actions) {
                        Object.keys(action.actions).forEach((key) => {
                            if (action.actions[key])
                                this.actions[key] = action.actions[key]
                        })
                    }
                    if (action.hooks) {
                        Object.keys(action.hooks).forEach((key) => {
                            if (action.hooks[key])
                                this.hooks[key] = action.hooks[key]
                        })
                    }
                    if (action.validator)
                        this.validator = action.validator();
                    if (action.asyncValidator)
                        this.asyncValidator = action.asyncValidator();
                }
            })
        }

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

    private controlNotifications: {
        disable?: string[],
        placeholder?: string[],
        filter?: string[],
        hide?: string[],
        description?: string[],
        label?: string[],
        all?: string[],
    };
}