import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-add-validator',
    templateUrl: './less-than-add.component.html'
})
export class LessThanAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            marks:['',], 
            passingMarks:['', RxwebValidators.lessThan({fieldName:'marks' })], 
        });
    }
}
