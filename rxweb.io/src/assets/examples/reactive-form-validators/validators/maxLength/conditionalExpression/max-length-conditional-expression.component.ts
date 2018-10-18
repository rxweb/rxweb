import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-conditionalExpression-validator',
    templateUrl: './max-length-conditional-expression.component.html'
})
export class MaxLengthConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										firstName:['', RxwebValidators.maxLength({value:16 })], 
													lastName:['', RxwebValidators.maxLength({value:16  ,conditionalExpression:'x => x.firstName == "John"' })], 
													middleName:['', RxwebValidators.maxLength({value:16  ,conditionalExpression:(x,y)=> x.firstName == "John" })], 
								});
    }
}
