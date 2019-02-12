import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-operator-validator',
    templateUrl: './max-date-operator.component.html'
})
export class MaxDateOperatorValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            enrollmentDate: [''],
            confirmationDate:['', RxwebValidators.maxDate({fieldName:'enrollmentDate'  ,operator:'<' })], 
        });
    }
}
