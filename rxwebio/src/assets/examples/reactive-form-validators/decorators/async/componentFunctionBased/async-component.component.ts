import { Component, OnInit } from '@angular/core';
import { FormGroup, AsyncValidatorFn, FormControl } from "@angular/forms"

import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-async-component',
    templateUrl: './async-component.component.html'
})
export class AsyncComponentBasedComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder) { }

    ngOnInit() {
        let user = new User();
        var formBuilderConfig = new FormBuilderConfiguration();
        formBuilderConfig.dynamicValidation = {
            userName: {
                async: [this.isUniqueUserName()]
            }
        }
        this.userFormGroup = this.formBuilder.formGroup(user, formBuilderConfig);
    }
    isUniqueUserName(): AsyncValidatorFn {
        return (control: FormControl) => {
            const promise = new Promise((resolve, reject) => {
                if (!control.value == false)
                    resolve(null)
                else
                    resolve({ 'async': 'You must enter a value' })
            });
            return promise;
        }
    }
}