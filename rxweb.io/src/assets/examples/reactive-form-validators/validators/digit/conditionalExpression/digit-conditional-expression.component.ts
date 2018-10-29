import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-digit-conditionalExpression-validator',
    templateUrl: './digit-conditional-expression.component.html'
})
export class DigitConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.digit()], 
            faxNumber:['', RxwebValidators.digit({conditionalExpression:'x => x.age ==25' })], 
            phoneNumber:['', RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25  })], 
        });
    }
}
