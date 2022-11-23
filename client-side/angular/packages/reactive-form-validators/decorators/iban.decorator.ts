import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { IBANConfig } from "../models/config/iban-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function iban(config?:IBANConfig) {
    return baseDecoratorFunction(AnnotationTypes.iban, config);
}

export function ibanAsync(config?: IBANConfig) {
    return baseDecoratorFunction(AnnotationTypes.iban, [baseAsyncValidator(config, AnnotationTypes.iban)],true);
}

