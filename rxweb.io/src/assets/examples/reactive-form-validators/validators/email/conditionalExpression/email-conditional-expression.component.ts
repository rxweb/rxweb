import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-conditionalExpression-validator',
    templateUrl: './email-conditional-expression.component.html'
})
export class EmailConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
										email:['',RxwebValidators.email()], 
													businessEmailAddress:['',RxwebValidators.email({conditionalExpression:x => x.email =="abc@gmail.com" })], 
													recoveryEmailAddress:['',RxwebValidators.email({conditionalExpression:(x,y) =>{ return  x.email == "abc@gmail.com" } })], 
								});
    }
}
