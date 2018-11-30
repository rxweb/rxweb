import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-fieldName-validator',
    templateUrl: './less-than-field-name.component.html'
})
export class LessThanFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            obtainedMarks:['',], 
            otherActivityMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks' })], 
        });
    }
}
