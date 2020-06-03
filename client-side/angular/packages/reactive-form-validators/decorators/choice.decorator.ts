import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ChoiceConfig } from "../models/config/choice-config";

export function choice(config?:ChoiceConfig) {
    return baseDecoratorFunction(AnnotationTypes.choice,config);
}
