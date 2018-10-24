import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-add-validator',
    templateUrl: './max-number-add.component.html'
})
export class MaxNumberAddValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.group({
            passingMarks:['', RxwebValidators.maxNumber({value:50 })], 
        });
    }
}
