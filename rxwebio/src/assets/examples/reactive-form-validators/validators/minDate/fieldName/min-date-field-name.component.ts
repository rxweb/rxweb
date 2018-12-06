import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-fieldName-validator',
    templateUrl: './min-date-field-name.component.html'
})
export class MinDateFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['',], 
            enrollmentDate:['',], 
            lastRegistrationDate:['', RxwebValidators.minDate({fieldName:'enrollmentDate' })], 
        });
    }
}
