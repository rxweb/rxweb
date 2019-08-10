import { PropDescriptor } from './prop-descriptor'
import { FILTER, SOURCE } from '../const/app.const'
import { ActionResult } from "../models/interface/action-config"
export abstract class BaseFormControlConfig extends PropDescriptor {
    config: { [key: string]: any };
    source: any[];

    constructor(private configs: { [key: string]: any }) {
        super();
    }




    complete() {
        this.controlNotifications = {  filter: [], disabled: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], class: [] }
        for (let action in this.controlNotifications)
            for (let columnName in this.configs) {
                if (!Array.isArray(this.configs[columnName])) {
                    let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.configs[columnName]), action);
                    if ((descriptor && descriptor.get) || this.configs[columnName].isFilterFunction) {
                        let stringFunction = this.configs[columnName].isFilterFunction ? String(this.configs[columnName][FILTER]) : String(descriptor.get);
                        if (stringFunction.indexOf(`.${this.config.name}`) != -1 || stringFunction.indexOf(`.${this.config.name};`) != -1) {
                            this.controlNotifications[action].push(columnName);
                        }
                    }
                }
            }
        this.overrideProps();
        this.updateActionValue();
    }

    refresh(actionName?: string) {
        for (var columnName in this.controlNotifications) {
            if (this.controlNotifications[columnName].length > 0)
                this.controlNotifications[columnName].forEach(x => {
                    if (x != this.config.name)
                        this.configs[x].refresh(columnName);
                    else
                        this.setActionValue(columnName);
                })
        }
        if (actionName)
            this.setActionValue(actionName);
    }


    private setActionValue(actionName: string) {
        if (actionName == FILTER && this.isDefinedFilter) {
            this[FILTER].call(this);
        } else
            this[actionName == FILTER ? SOURCE : actionName] = this[actionName];
    }

    private updateActionValue() {
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "filter", "source"].forEach(key => {
            switch (key) {
                case FILTER:
                case SOURCE:
                    if (this.config[key])
                        this[key] = this.config[key];
                    if (this.config.filter) {
                        this[key] = this[FILTER];
                    }
                    if (this.isDefinedFilter && key == FILTER)
                        this[FILTER]();
                    if (key == SOURCE && !this.source)
                        this[key] = [];
                    break;
                default:
                    if (this.config.ui && this.config.ui[key])
                        this[key] = this.config.ui[key];
                    else
                        this[key == FILTER ? SOURCE : key] = this._actionResult[key];
                    break;

            }

        })
    }


    private _actionResult: ActionResult = {
        label: undefined,
        placeholder: '',
        source: [],
        filter: [],
        hide: false,
        description: undefined,
        disabled: false,
        focus: false,
        readonly: false,
        class: [],
        prependText: ''
    };

    private controlNotifications: {
        disabled?: string[],
        placeholder?: string[],
        filter?: string[],
        hide?: string[],
        description?: string[],
        label?: string[],
        focus?: string[],
        readonly: string[],
        class: string[],
    };

}