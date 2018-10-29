import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-complete-validator',
    templateUrl: './max-number-complete.component.html'
})
export class MaxNumberCompleteValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.group({
            subjectCode:['',], 
            maximumMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:(x,y) => x.subjectCode == "8CS5A"  })], 
            obtainedMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:'x => x.subjectCode == "8CS5A"' })], 
            passingMarks:['', RxwebValidators.maxNumber({value:50  ,message:'{{0}} exceeds the Maximum marks Limit' })], 
        });
    }
}
