import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compose-complete-validator',
    templateUrl: './compose-complete.component.html'
})
export class ComposeCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.compose({validators:[RxwebValidators.required(), RxwebValidators.alpha()] })], 
            lastName:['', RxwebValidators.compose({validators:[RxwebValidators.required(), RxwebValidators.alpha()]  ,messageKey:'composeMessageKey' })], 
            age:['', RxwebValidators.compose({validators:[RxwebValidators.digit()]  ,conditionalExpression:(x,y) => x.firstName == "Bharat" })], 
            city:['', RxwebValidators.compose({validators:[RxwebValidators.alpha()]  ,conditionalExpression:'x => x.firstName =="Bharat"' })], 
            countryName:['', RxwebValidators.compose({validators:[RxwebValidators.alpha()]  ,message:'You can only enter alphabets.' })], 
        });
    }
}
