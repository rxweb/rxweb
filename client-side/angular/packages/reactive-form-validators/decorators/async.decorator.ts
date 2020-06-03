import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { AsyncValidatorFn } from "@angular/forms";

export function async(validators:AsyncValidatorFn[]) {
    return baseDecoratorFunction(AnnotationTypes.async, validators,true);
}

