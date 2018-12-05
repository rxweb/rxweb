import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-fieldName-validator',
    templateUrl: './greater-than-equal-to-field-name.component.html'
})
export class GreaterThanEqualToFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            admissionAge:['',], 
            retiermentAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge' })], 
        });
    }
}
