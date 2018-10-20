import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-required-conditionalExpression-validator',
    templateUrl: './required-conditional-expression.component.html'
})
export class RequiredConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										firstName:['', RxwebValidators.required()], 
													lastName:['', RxwebValidators.required({conditionalExpression:'x => x.firstName == "John"' })], 
													middleName:['', RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "John"  })], 
								});
    }
}
