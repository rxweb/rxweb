import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-conditionalExpression-validator',
    templateUrl: './even-conditional-expression.component.html'
})
export class EvenConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																evenNumber:['',RxwebValidators.even({conditionalExpression:x => x.type == "Even" })], 
													number:['',RxwebValidators.even({conditionalExpression:(x,y) =>{ return  x.type == "Even" } })], 
								});
    }
}
