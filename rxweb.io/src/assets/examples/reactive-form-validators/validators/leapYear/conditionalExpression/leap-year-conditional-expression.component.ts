import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-conditionalExpression-validator',
    templateUrl: './leap-year-conditional-expression.component.html'
})
export class LeapYearConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										name:['',], 
													admissionYear:['', RxwebValidators.leapYear({conditionalExpression:'x => x.name == "John"' })], 
													birthYear:['', RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "John"  })], 
								});
    }
}
