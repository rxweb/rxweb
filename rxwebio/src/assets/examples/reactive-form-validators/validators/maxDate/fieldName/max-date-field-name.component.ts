import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-fieldName-validator',
    templateUrl: './max-date-field-name.component.html'
})
export class MaxDateFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            enrollmentDate:['',], 
            lastRegistrationDate:['', RxwebValidators.maxDate({fieldName:'enrollmentDate' })], 
        });
    }
}
