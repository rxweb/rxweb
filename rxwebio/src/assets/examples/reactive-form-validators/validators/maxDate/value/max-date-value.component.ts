import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-value-validator',
    templateUrl: './max-date-value.component.html'
})
export class MaxDateValueValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            allocationDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30) })], 
        });
    }
}
