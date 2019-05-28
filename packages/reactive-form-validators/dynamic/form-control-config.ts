import { AbstractControl,ValidatorFn, AsyncValidatorFn } from "@angular/forms"
import { defaultContainer } from '../core/defaultContainer';
import { ActionFnConfig,Hooks,ActionResult } from "../models/config/action-config"

const SOURCE: string = "source";
const FILTER: string = "filter";
const HIDE: string = "hide";

export abstract class FormControlConfig {
    private _value: any;
    private _source: any[];
    private _formControl: AbstractControl;
    private _isPlainTextMode: boolean = false;
    constructor(fieldConfig: { [key: string]: any }, public controlsConfig: { [key: string]: FormControlConfig}) {
        this.config = fieldConfig;
        this.setNotifications();
        this.setActions();
        if (!this.actions.filter && this.config.source)
            this.source = this.config.source;
    }

    config: { [key: string]: any };
    inputs: any;
    events:any;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    onHide: () => void;
    hooks: Hooks
    actions: ActionFnConfig
    override:boolean;
    attributeChangeSubscriptions: Array<any> = new Array<any>();
    onAttributeValueChange(names: string[], func: Function) {
        this.attributeChangeSubscriptions.push({ names: names, func: func });
    }


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

    get source(){
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
        this.notifyAttributeValueChange('label', value);
        this._actionResult.label = value;
    }

    get label(): string {
        return this._actionResult.label;
    }

    set placeholder(value: string) {
        this.notifyAttributeValueChange('placeholder', value);
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
        this.notifyAttributeValueChange('description', value);
        this._actionResult.description = value;
    }

    get description(): string {
        return this._actionResult.description;
    }

    set focus(value: boolean) {
        this.notifyAttributeValueChange('focus', value);
        this._actionResult.focus = value;
    }

    get focus(): boolean {
        return this._actionResult.focus;
    }

    set readonly(value: boolean) {
        this.notifyAttributeValueChange('readonly', value);
        this._actionResult.readonly = value;
    }

    get readonly() {
        return this._actionResult.readonly;
    }

    set cssClassNames(value: string[]) {
        this.notifyAttributeValueChange('cssClassNames', value);
        this._actionResult.cssClassNames = value;
    }

    get cssClassNames() {
        return this._actionResult.cssClassNames;
    }

    set isPlainTextMode(value: boolean) {
        this._isPlainTextMode = value;
    } 

    get isPlainTextMode() {
        return this._isPlainTextMode;
    }

    viewMode: string;
    
    get prependText() {
        return this.config.ui ? this.config.ui.prependText : '';
    }

    




    complete() {
        for (let action in this.controlNotifications)
            for (let columnName in this.controlsConfig) {
                if (!Array.isArray(this.controlsConfig[columnName]) && this.controlsConfig[columnName].actions[action]) {
                    let stringFunction = String(this.controlsConfig[columnName].actions[action]);
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
                        this.controlsConfig[x].refresh(columnName);
                    else
                        this.setActionValue(columnName);
                })
        }
        if (actionName)
            this.setActionValue(actionName);
    }

    notifyAttributeValueChange(name, value) {
        if (this.isNotEqual(this._actionResult[name], value) && this.onAttributeValueChange) {
            if (name == "cssClassNames")
                value = { oldClassNames: this._actionResult[name], newClassNames: value };
            let subscriptions = this.attributeChangeSubscriptions.filter(t => t.names.indexOf(name) != -1);
            subscriptions.forEach(subscribe => subscribe.func(name, value));
        }

    }

    private isNotEqual(leftValue: any, rightValue: any) {
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            let isEqual = leftValue.length == rightValue.length;
            if (isEqual)
                for (var i = 0; i < leftValue.length; i++) {
                    isEqual = rightValue.indexOf(leftValue[i]) != -1
                    if (!isEqual)
                        break;
                }
            return !isEqual
        }
        return leftValue != rightValue;
    }

    private setActionValue(actionName:string) {
        this[actionName == FILTER ? SOURCE : actionName] = this.actions[actionName].call(this);
        if (this.onHide && actionName == HIDE)
            this.onHide();
    }

    private updateActionValue() {
        Object.keys(this.controlNotifications).forEach(key => {
            if (this.actions[key])
                this[key] = this.actions[key].call(this);
            else if (this.config.ui && this.config.ui[key])
                this[key] = this.config.ui[key];

        })
    }


    private setNotifications() {
        this.controlNotifications = { all: [], filter: [], disable: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], cssClassNames: [] }
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

    private _actionResult: ActionResult = {
        label: '',
        placeholder: '',
        filter: [],
        hide: false,
        description: '',
        disable: false,
        focus: false,
        readonly: false,
        cssClassNames: [],
        prependText: ''
    };

    private controlNotifications: {
        disable?: string[],
        placeholder?: string[],
        filter?: string[],
        hide?: string[],
        description?: string[],
        label?: string[],
        focus?: string[],
        readonly: string[],
        cssClassNames: string[],
        all?: string[],
    };
}