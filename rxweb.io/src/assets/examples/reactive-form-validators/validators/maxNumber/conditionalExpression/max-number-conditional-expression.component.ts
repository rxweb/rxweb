import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-conditionalExpression-validator',
    templateUrl: './max-number-conditional-expression.component.html'
})
export class MaxNumberConditionalExpressionValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.formGroup({
																obtainedMarks:['',RxwebValidators.maxNumber({value:100  ,conditionalExpression:x => x.subjectCode == "8CS5A" })], 
													maximumMarks:['',RxwebValidators.maxNumber({value:100  ,conditionalExpression:(x,y) =>{ return   x.subjectCode == "8CS5A" } })], 
								});
    }
}
