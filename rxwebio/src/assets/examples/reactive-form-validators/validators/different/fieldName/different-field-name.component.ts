import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-fieldName-validator',
    templateUrl: './different-field-name.component.html'
})
export class DifferentFieldNameValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
            firstName:['',], 
            middleName:['', RxwebValidators.different({fieldName:'firstName' })], 
        });
    }
}
