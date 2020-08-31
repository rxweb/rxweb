import {
    AbstractControl,
    AsyncValidatorFn
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { APP_VALIDATORS } from '../../const/app-validators.const'
import { FormProvider } from '../../util/form-provider';

export function baseAsyncValidator(configModel: any, validatorName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
        if (configModel.validatorConfig) {
            if (FormProvider.ProcessRule(control, configModel)) {
                return (<Observable<any>>configModel.validatorConfig).pipe(map(resolveConfig(configModel, validatorName, control)));
            }
            return of(null);
        }
        else
            return of(resolveConfig(configModel, validatorName, control)(configModel));
    }
}


function resolveConfig(configModel: any, validatorName: string, control: AbstractControl) {
    return config => {
        let configClone = { ...configModel, ...config,...{expressionProcessed:true } };
        return APP_VALIDATORS[validatorName](configClone)(control)
    }
}