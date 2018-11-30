import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-message-validator',
    templateUrl: './less-than-message.component.html'
})
export class LessThanMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            obtainedMarks:['',], 
            otherMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' })], 
        });
    }
}
