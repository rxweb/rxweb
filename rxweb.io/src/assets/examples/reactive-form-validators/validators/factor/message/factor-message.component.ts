import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-factor-message-validator',
    templateUrl: './factor-message.component.html'
})
export class FactorMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            fourthNumber:['', RxwebValidators.factor({dividend:50  ,message:'{{0}} is not a factor of 50' })], 
        });
    }
}
