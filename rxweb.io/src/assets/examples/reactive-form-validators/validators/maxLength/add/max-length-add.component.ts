import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-add-validator',
    templateUrl: './max-length-add.component.html'
})
export class MaxLengthAddValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.maxLength({value:10 })], 
        });
    }
}
