import { PropDescriptor } from './prop-descriptor'
import { FILTER, SOURCE } from '../const/app.const'
import { ActionResult } from "../models/interface/action-config"
import { Linq } from '../util/linq'
import { NotificationState } from '../statics/control-state';
export abstract class BaseFormControlConfig extends PropDescriptor {
    config: { [key: string]: any };
    source: any[];

    constructor(private configs: { [key: string]: any }, private notificationId: number) {
        super();

    }

    setNotification() {
        if (NotificationState.notifications[this.notificationId])
            if (!NotificationState.notifications[this.notificationId][this.config.name])
                NotificationState.notifications[this.notificationId][this.config.name] =
                    this.controlNotifications = { filter: [], disabled: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], class: [] }
            else
                this.controlNotifications = NotificationState.notifications[this.notificationId][this.config.name];
        this.complete();
    }



    complete() {
        for (let action in this.controlNotifications) {
            let descriptor = this.getDescriptor(action);
                if ((descriptor && descriptor.get) || this.isDefinedFilter) {
                    let stringFunction = this.isDefinedFilter ? String(this[FILTER]) : String(descriptor.get);
                    let columnNames = Linq.dynamicConfigParser(stringFunction);
                    columnNames.forEach(column => {
                        if (!NotificationState.notifications[this.notificationId][column])
                            NotificationState.notifications[this.notificationId][column] = { filter: [], disabled: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], class: [] }
                        let controlNotifications = NotificationState.notifications[this.notificationId][column];
                        controlNotifications[action].push(this.config.name)
                    })
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
                    if (this.isDefinedFilter && key == FILTER)
                        this[FILTER]();
                    if (this.config.filter)
                        this[FILTER] = this.config.filter;
                    break;
                case SOURCE:
                    if (this.config[key])
                        this[key] = this.config[key];
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
        placeholder: undefined,
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