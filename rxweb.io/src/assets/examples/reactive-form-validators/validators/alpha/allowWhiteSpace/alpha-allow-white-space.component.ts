import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-allowWhiteSpace-validator',
    templateUrl: './alpha-allow-white-space.component.html'
})
export class AlphaAllowWhiteSpaceValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
            stateName:['', RxwebValidators.alpha({allowWhiteSpace:true })], 
        });
    }
}
