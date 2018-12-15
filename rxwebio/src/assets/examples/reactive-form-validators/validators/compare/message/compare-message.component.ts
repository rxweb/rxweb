import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-message-validator',
    templateUrl: './compare-message.component.html'
})
export class CompareMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            confirmPassword:['', RxwebValidators.compare({fieldName:'password'  ,message:'You must enter same password' })], 
        });
    }
}
