import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-fieldName-validator',
    templateUrl: './less-than-equal-to-field-name.component.html'
})
export class LessThanEqualToFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            totalMarks:['',], 
            passingMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks' })], 
        });
    }
}
