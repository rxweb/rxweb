import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-conditionalExpression-validator',
    templateUrl: './email-conditional-expression.component.html'
})
export class EmailConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            email:['', RxwebValidators.email()], 
            businessEmailAddress:['', RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"' })], 
            recoveryEmailAddress:['', RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com"  })], 
        });
    }
}
