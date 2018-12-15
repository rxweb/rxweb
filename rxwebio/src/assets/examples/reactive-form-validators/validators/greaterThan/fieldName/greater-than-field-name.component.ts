import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-fieldName-validator',
    templateUrl: './greater-than-field-name.component.html'
})
export class GreaterThanFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            age:['',], 
            retiermentAge:['', RxwebValidators.greaterThan({fieldName:'age' })], 
        });
    }
}
