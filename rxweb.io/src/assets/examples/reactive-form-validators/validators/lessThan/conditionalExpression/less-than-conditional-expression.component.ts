import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-conditionalExpression-validator',
    templateUrl: './less-than-conditional-expression.component.html'
})
export class LessThanConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										obtainedMarks:['',], 
													passingMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:'x => x.obtainedMarks < 35' })], 
													practicalExamMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>  x.obtainedMarks < 35 })], 
								});
    }
}
