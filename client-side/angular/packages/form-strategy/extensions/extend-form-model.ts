import { FormBuilder, AbstractControlOptions, FormGroup as BaseFormGroup, AbstractControl, FormControl } from "@angular/forms";
import { FormControlStrategy } from "../model/form-control-strategy";
import { FormGroup } from "../interface/form-group"
import { setControlWiseStrategy } from "./form-group-extension/set-control-wise-strategy";
import { FormErrorMessageModuleConfig } from "../interface/form-error-message-module-config";
import { overrideErrorsProp } from "./form-control-extension/override-errors-prop";
import { errorMessage } from "./form-control-extension/error-message";
import { errorMessages } from "./form-control-extension/error-messages";
import { strategy } from './form-control-extension/strategy'
import { setValue } from "./form-control-extension/set-value";
import { runStrategy } from "./form-control-extension/run-strategy";
import { setStrategy } from "./form-control-extension/set-strategy";
import { extractFormControlStrategy } from "../functions/extract-control-strategy";
import { CONTROLS_ERROR } from "../const/app.const";
import { updateValueAndValidity } from "./form-control-extension/update-value-and-validity";

const ERRORS: string = "errors";
const ERROR_MESSAGE: string = "errorMessage";
const ERROR_MESSAGES: string = "errorMessages";
const STRATEGY: string = "strategy";
const SET_VALUE: string = "setValue";
const RUN_STRATEGY: string = "runStrategy";
const SET_STRATEGY: string = "setStrategy";
const UPDATE_VALUE_AND_VALIDITY: string = "updateValueAndValidity";
export class ExtendFormModel {
    private propConfig: { [key: string]: any } = { enumerable: true, configurable: true }

    extend(config: FormErrorMessageModuleConfig) {
        this.group();
        this.formControl(config);
    }

    private group() {
        FormBuilder.prototype.group = this.groupExtension(FormBuilder.prototype.group);
        BaseFormGroup.prototype[SET_STRATEGY] = setControlWiseStrategy;
    }

    
    formControl(errorMessageConfig: FormErrorMessageModuleConfig) {
        Object.defineProperty(AbstractControl.prototype, ERRORS, overrideErrorsProp(errorMessageConfig));
        Object.defineProperty(AbstractControl.prototype, ERROR_MESSAGE, { ...this.propConfig, ...{ get: errorMessage } });
        Object.defineProperty(AbstractControl.prototype, ERROR_MESSAGES, { ...this.propConfig, ...{ get: errorMessages } });
        Object.defineProperty(AbstractControl.prototype, STRATEGY, { ...this.propConfig, ...{ get: strategy } });
        FormControl.prototype[SET_VALUE] = setValue(FormControl.prototype.setValue);
        FormControl.prototype[UPDATE_VALUE_AND_VALIDITY] = updateValueAndValidity(FormControl.prototype.updateValueAndValidity);
        FormControl.prototype[RUN_STRATEGY] = runStrategy;
        FormControl.prototype[SET_STRATEGY] = setStrategy;
    }

    private groupExtension(baseGroup: Function) {
        return function (controlsConfig: {
            [key: string]: any;
        }, options?: AbstractControlOptions | {
            [key: string]: any;
        } | null): FormGroup {
            let controlStrategies: {
                [key: string]: FormControlStrategy
            } = {}
            extractFormControlStrategy(controlsConfig, controlStrategies);
            return (<FormGroup>baseGroup.call(this, controlsConfig, options)).setStrategy(controlStrategies);
        }
    }

    
}