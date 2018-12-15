import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-fieldName-validator',
    templateUrl: './compare-field-name.component.html'
})
export class CompareFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            email:['',], 
            confirmEmail:['', RxwebValidators.compare({fieldName:'email' })], 
        });
    }
}
