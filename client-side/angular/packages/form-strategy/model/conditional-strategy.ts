import { CondtionalStrategyOptions } from "../interface/conditional-strategy-options";
import { FormControl } from "../interface/form-control";
import { runExpression } from "../functions/run-expression";
import { ApplicationUtil } from "../util/app-util";

export class ConditionalStrategy {
    private message: Function;
    private disable: Function;

    constructor(strategyOptions: CondtionalStrategyOptions) {
        this.message = strategyOptions.message;
        this.disable = strategyOptions.disable;
    }

    formControl: FormControl;

    allowMessageBinding() {
        return this.message ? this.message.call(this.formControl.parent.value, this.formControl.parent.value, ApplicationUtil.rootFormGroup(this.formControl).value) : true;
    }

    get controlDisable(): boolean {
        return this.disable ? runExpression(this.disable, this.formControl.parent.value,[this.formControl.parent.value, ApplicationUtil.rootFormGroup(this.formControl).value]) : null;
    }


    runStrategy(isSelf: boolean) {
        if (!isSelf && this.message)
            this.formControl.errors;
        let allowDisable = this.controlDisable;
        if (allowDisable !== null) {
            if (allowDisable)
                this.formControl.disable();
            else
                this.formControl.enable();
        }
    }
}