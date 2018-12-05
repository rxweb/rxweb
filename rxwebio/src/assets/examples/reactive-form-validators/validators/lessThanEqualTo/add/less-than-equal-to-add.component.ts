import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-add-validator',
    templateUrl: './less-than-equal-to-add.component.html'
})
export class LessThanEqualToAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            totalMarks:['',], 
            marks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks' })], 
        });
    }
}
