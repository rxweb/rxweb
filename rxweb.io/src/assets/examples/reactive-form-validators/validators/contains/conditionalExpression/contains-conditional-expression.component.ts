import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-conditionalExpression-validator',
    templateUrl: './contains-conditional-expression.component.html'
})
export class ContainsConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            emailAddress:['', RxwebValidators.contains({value:'@gmail.com' })], 
            recoveryEmailAddress:['', RxwebValidators.contains({value:'@gmail.com'  ,conditionalExpression:'x => x.emailAddress == "abc@gmail.com"' })], 
            businessEmailAddress:['', RxwebValidators.contains({value:'@gmail.com'  ,conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com" })], 
        });
    }
}
