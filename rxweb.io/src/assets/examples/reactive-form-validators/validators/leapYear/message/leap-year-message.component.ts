import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-message-validator',
    templateUrl: './leap-year-message.component.html'
})
export class LeapYearMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            joiningYear:['', RxwebValidators.leapYear({message:'{{0}} is not a leap year' })], 
        });
    }
}
