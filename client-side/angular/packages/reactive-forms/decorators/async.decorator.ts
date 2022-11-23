import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { AsyncValidatorFn } from "../models/interface/validator-fn";

export function async(validators:AsyncValidatorFn[]) {
    return baseDecoratorFunction(AnnotationTypes.async, validators,true);
}

