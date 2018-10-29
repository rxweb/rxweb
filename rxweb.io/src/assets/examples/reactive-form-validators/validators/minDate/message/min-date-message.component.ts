import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-message-validator',
    templateUrl: './min-date-message.component.html'
})
export class MinDateMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Minimum Date Limit' })], 
        });
    }
}
