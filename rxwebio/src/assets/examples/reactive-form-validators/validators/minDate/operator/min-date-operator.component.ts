import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-operator-validator',
    templateUrl: './min-date-operator.component.html'
})
export class MinDateOperatorValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            enrollmentDate: [''],
            confirmationDate:['', RxwebValidators.minDate({fieldName:'enrollmentDate'  ,operator:'>' })], 
        });
    }
}