import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-message-validator',
    templateUrl: './longitude-message.component.html'
})
export class LongitudeMessageValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            firstCountryLongitude:['', RxwebValidators.longitude({message:'{{0}} is not a longitude' })], 
        });
    }
}
