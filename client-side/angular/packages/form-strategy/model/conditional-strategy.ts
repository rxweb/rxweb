import { CondtionalStrategyOptions } from "../interface/conditional-strategy-options";
import { FormControl } from "../interface/form-control";
import { runExpression } from "../functions/run-expression";
import { ApplicationUtil } from "../util/app-util";
import { ErrorMessageBindingStrategy } from "../enums/error-message-binding-strategy";
import { errorMessageContainer } from "../core/error-message.containter";

export class ConditionalStrategy {
    private message: Function;
    private disable: Function;

    bindingStrategy: ErrorMessageBindingStrategy;

    constructor(strategyOptions: CondtionalStrategyOptions) {
        this.message = strategyOptions.message;
        this.disable = strategyOptions.disable;
        this.bindingStrategy = strategyOptions.messageBindingStrategy || errorMessageContainer.config.messageBindingStrategy;
    }

    formControl: FormControl;

    allowMessageBinding() {
        return this.message ? this.message.call(this.formControl.parent.value, this.formControl.parent.value, ApplicationUtil.rootFormGroup(this.formControl).value) : true;
    }

    get controlDisable(): boolean {
        return this.disable ? this.disable.call(this.formControl.parent.value,this.formControl.parent.value, ApplicationUtil.rootFormGroup(this.formControl).value) : null;
    }

    runBindingStrategy() {
        if (this.bindingStrategy && !this.message)
            this.formControl.errors;
    }

    runStrategy(isSelf: boolean) {
        if (!isSelf && this.message)
            this.formControl.errors;
        let allowDisable = this.controlDisable;
        if (allowDisable !== null) {
            if (allowDisable)
                this.formControl.disable();
            else if (this.formControl.disabled)
                this.formControl.enable();
        }
    }

   
}