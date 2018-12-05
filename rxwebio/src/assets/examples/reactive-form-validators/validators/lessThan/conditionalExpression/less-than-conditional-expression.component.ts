import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-conditionalExpression-validator',
    templateUrl: './less-than-conditional-expression.component.html'
})
export class LessThanConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            obtainedMarks:['',], 
            passingMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:'x => x.obtainedMarks < 35' })], 
            practicalExamMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>  x.obtainedMarks < 35 })], 
        });
    }
}
