import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-conditionalExpression-validator',
    templateUrl: './max-number-conditional-expression.component.html'
})
export class MaxNumberConditionalExpressionValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.group({
            subjectCode:['',], 
            obtainedMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:'x => x.subjectCode == "8CS5A"' })], 
            maximumMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:(x,y) => x.subjectCode == "8CS5A"  })], 
        });
    }
}
