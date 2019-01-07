import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compose-conditionalExpression-validator',
    templateUrl: './compose-conditional-expression.component.html'
})
export class ComposeConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.compose({validators:[RxwebValidators.required(), RxwebValidators.alpha()] })], 
            city:['', RxwebValidators.compose({validators:[RxwebValidators.alpha()]  ,conditionalExpression:'x => x.firstName =="Bharat"' })], 
            age:['', RxwebValidators.compose({validators:[RxwebValidators.digit()]  ,conditionalExpression:(x,y) => x.firstName == "Bharat" })], 
        });
    }
}
