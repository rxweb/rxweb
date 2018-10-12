import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-conditionalExpression-validator',
    templateUrl: './max-date-conditional-expression.component.html'
})
export class MaxDateConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										userName:['',], 
													admissionDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "John"' })], 
													birthDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "John"  })], 
								});
    }
}
