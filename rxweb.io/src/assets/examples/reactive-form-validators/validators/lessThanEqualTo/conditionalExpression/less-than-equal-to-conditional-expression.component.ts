import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-conditionalExpression-validator',
    templateUrl: './less-than-equal-to-conditional-expression.component.html'
})
export class LessThanEqualToConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																practicalExamMarks:['',RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:x => x.totalMarks == 100 })], 
													obtainedMarks:['',RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:(x,y) =>{ return  x.totalMarks == 100 } })], 
								});
    }
}
