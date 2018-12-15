import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-complete-validator',
    templateUrl: './compare-complete.component.html'
})
export class CompareCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            email:['',], 
            confirmEmail:['', RxwebValidators.compare({fieldName:'email' })], 
            password:['',], 
            confirmPassword:['', RxwebValidators.compare({fieldName:'password'  ,message:'You must enter same password' })], 
        });
    }
}
