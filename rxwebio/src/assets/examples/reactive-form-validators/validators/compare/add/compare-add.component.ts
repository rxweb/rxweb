import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-add-validator',
    templateUrl: './compare-add.component.html'
})
export class CompareAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            password:['',], 
            confirmPassword:['', RxwebValidators.compare({fieldName:'password' })], 
        });
    }
}
