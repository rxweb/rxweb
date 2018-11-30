import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-message-validator',
    templateUrl: './less-than-equal-to-message.component.html'
})
export class LessThanEqualToMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            totalMarks:['',], 
            otherMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,message:'Please enter number less than 100.' })], 
        });
    }
}
