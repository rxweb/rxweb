import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-message-validator',
    templateUrl: './max-date-message.component.html'
})
export class MaxDateMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.maxDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Maximum Date Limit' })], 
        });
    }
}
