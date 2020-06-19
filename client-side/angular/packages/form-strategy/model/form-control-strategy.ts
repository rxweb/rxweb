import { StrategyNotifier } from "../functions/strategy-notifier";
import { Linq } from "../util/linq";
import { NotifierPathType } from "../enums/notifier-path-type";
import { FormGroup } from "../interface/form-group";
import { ApplicationUtil } from "../util/app-util";
import { ConditionalStrategy } from './conditional-strategy'
import { FormControlStrategyOptions } from "../interface/form-control-strategy-options";
import { FormControl } from "../interface/form-control";
import { SANITIZERS } from "@rxweb/sanitizers"
import { SanitizerConfig } from "../interface/sanitizer-config";
export class FormControlStrategy {
    private notifiers: StrategyNotifier = { message: [], disable: [], sanitizers: [] };
    private _formControl: FormControl;
    private sanitizers: SanitizerConfig;
    constructor(formControlStrategy: FormControlStrategyOptions) {
        this.conditional = new ConditionalStrategy(formControlStrategy.conditional || {});
        this.notifiers.message = (formControlStrategy.conditional && formControlStrategy.conditional.message) ? Linq.expressionColumns(formControlStrategy.conditional.message, true) : [];
        this.notifiers.disable = (formControlStrategy.conditional && formControlStrategy.conditional.disable) ? Linq.expressionColumns(formControlStrategy.conditional.disable, true) : [];
        this.sanitizers = formControlStrategy.sanitize;
        this.notifiers.sanitizers = (formControlStrategy.conditional && formControlStrategy.conditional.disable) ? Linq.expressionColumns(formControlStrategy.conditional.disable, true) : [];
        if (this.sanitizers)
            Object.keys(this.sanitizers).forEach(t => {
                if (this.sanitizers[t] === true)
                    this.sanitizers[t] = {};
                if (this.sanitizers[t].expression)
                    Linq.expressionColumns(this.sanitizers[t].expression, true).forEach(x => { if (this.notifiers.sanitizers.indexOf(x) === -1) this.notifiers.sanitizers.push(x); })
        })
        this.notifications = { message: [], disable: [], sanitizers: [] };
    }

    conditional?: ConditionalStrategy;
    notifications?: StrategyNotifier;
    name: string;
    marked: boolean = false;
    set formControl(value: FormControl) {
        this.conditional.formControl = this._formControl = value;
    }


    get formControl() {
        return this._formControl;
    }

    setNotficationPath(path: string, notifierType: NotifierPathType): void {
        switch (notifierType) {
            case NotifierPathType.message:
                this.notifications.message.push(path)
                break;
            case NotifierPathType.disable:
                this.notifications.disable.push(path)
                break;
            case NotifierPathType.sanitize:
                this.notifications.sanitizers.push(path)
                break;
        }
    }

    getNotifiers() {
        return this.notifiers;
    }


    configureNotification() {
        this.notifiers.message.forEach(t => this.setControlNotification(t, NotifierPathType.message));
        this.notifiers.disable.forEach(t => this.setControlNotification(t, NotifierPathType.disable))
        this.notifiers.sanitizers.forEach(t => this.setControlNotification(t, NotifierPathType.sanitize))
        this.marked = true;
    }

    private setControlNotification(jObject: any, notifierType: NotifierPathType) {
        if (this.formControl.parent) {
            let control = ApplicationUtil.getControl(jObject.propName, <FormGroup>this.formControl.parent);
            if (control)
                control.strategy.setNotficationPath(this.name, notifierType);
        }
    }

    notify() {
        this.conditional.runBindingStrategy();
        this.notifications.message.forEach(controlPath => this.callStrategy(controlPath))
        this.notifications.disable.forEach(controlPath => this.callStrategy(controlPath))
        this.notifications.sanitizers.forEach(controlPath => this.callStrategy(controlPath, NotifierPathType.sanitize))
    }

    callStrategy(controlPath: string, notifierType?: NotifierPathType) {
        let control = ApplicationUtil.getControl(controlPath, <FormGroup>this.formControl.parent);
        if (control && control.strategy && !notifierType)
            control.strategy.conditional.runStrategy(false);
        else if (notifierType)
            control.strategy.sanitize();
    }

    sanitize() {
        let parsedValue = value;
        Object.keys(this.sanitizers).forEach(sanitizerName => {
            let config = this.sanitizers[sanitizerName];
            parsedValue = config.expression && config.expression.call(this.formControl.parent.value, this.formControl.parent.value, ApplicationUtil.rootFormGroup(this.formControl).value) ? SANITIZERS[sanitizerName](value, config) : value;
        })
        return parsedValue;
    }
}
