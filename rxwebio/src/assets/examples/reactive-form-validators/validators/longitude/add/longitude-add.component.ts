import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-add-validator',
    templateUrl: './longitude-add.component.html'
})
export class LongitudeAddValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
            firstCountryLongitude:['', RxwebValidators.longitude()], 
        });
    }
}
