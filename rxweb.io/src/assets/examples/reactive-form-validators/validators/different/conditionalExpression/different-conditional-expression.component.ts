import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-conditionalExpression-validator',
    templateUrl: './different-conditional-expression.component.html'
})
export class DifferentConditionalExpressionValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
										firstName:['',], 
													userName:['', RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:'x => x.firstName == "Bharat"' })], 
													lastName:['', RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:(x,y) => x.firstName == "Bharat"  })], 
								});
    }
}
