import { ErrorMessageBindingStrategy } from "../enums/error-message-binding-strategy";
import { StrategyNotifier } from "../functions/strategy-notifier";
import { Linq } from "../util/linq";
import { NotifierPathType } from "../enums/notifier-path-type";
import { FormGroup } from "../interface/form-group";
import { ApplicationUtil } from "../util/app-util";
import { errorMessageContainer } from "../core/error-message.containter";
import { ConditionalStrategy } from './conditional-strategy'
import { FormControlStrategyOptions } from "../interface/form-control-strategy-options";
import { FormControl } from "../interface/form-control";
export class FormControlStrategy {
    private notifiers: StrategyNotifier = { message: [], disable: [] };
    private _formControl: FormControl;
    
    constructor(formControlStrategy: FormControlStrategyOptions) {
        this.conditional = new ConditionalStrategy(formControlStrategy.conditional);
        this.binding = formControlStrategy.binding || errorMessageContainer.config.bindingStrategy; 
        this.notifiers.message = (formControlStrategy.conditional && formControlStrategy.conditional.message) ? Linq.expressionColumns(formControlStrategy.conditional.message, true) : [];
        this.notifiers.disable = (formControlStrategy.conditional && formControlStrategy.conditional.disable) ? Linq.expressionColumns(formControlStrategy.conditional.disable, true) : [];
        this.notifications = { message: [], disable: [] };
    }

    conditional?: ConditionalStrategy;
    binding?: ErrorMessageBindingStrategy
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
        }
    }

    getNotifiers() {
        return this.notifiers;
    }


    configureNotification() {
        this.notifiers.message.forEach(t => this.setControlNotification(t, NotifierPathType.message));
        this.notifiers.disable.forEach(t => this.setControlNotification(t, NotifierPathType.disable))
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
        this.notifications.message.forEach(controlPath => {
            let control = ApplicationUtil.getControl(controlPath, <FormGroup>this.formControl.parent);
            if (control && control.strategy)
                control.strategy.conditional.runStrategy(false);
        })
    }
}
