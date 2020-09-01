import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ChoiceConfig } from "../models/config/choice-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function choice(config?:ChoiceConfig) {
    return baseDecoratorFunction(AnnotationTypes.choice,config);
}
export function choiceAsync(config?: ChoiceConfig) {
    return baseDecoratorFunction(AnnotationTypes.choice, [baseAsyncValidator(config, AnnotationTypes.choice)], true);
}
