import { FormControlConfig } from "@rxweb/reactive-dynamic-forms";
import { AbstractControl } from "@angular/forms"
export class AsyncCustomValidation extends FormControlConfig {

    asyncValidator = (control: AbstractControl) => {
        let promise = new Promise<any>((resolve, reject) => {
            if(control.value == "India")
                resolve(null);
            else
                resolve({ required: {message:"Custom Async Message"}})
        });
        return promise;
    }

}