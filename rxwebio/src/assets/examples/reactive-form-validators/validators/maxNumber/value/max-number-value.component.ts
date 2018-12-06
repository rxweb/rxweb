import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-value-validator',
    templateUrl: './max-number-value.component.html'
})
export class MaxNumberValueValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.group({
            obtainedMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:'x => x.subjectCode == "8CS5A"' })], 
            maximumMarks:['', RxwebValidators.maxNumber({value:100  ,conditionalExpression:(x,y) => x.subjectCode == "8CS5A"  })], 
        });
    }
}
