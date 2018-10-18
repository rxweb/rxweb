import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latitude-message-validator',
    templateUrl: './latitude-message.component.html'
})
export class LatitudeMessageValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
										firstCountryLatitude:['', RxwebValidators.latitude({message:'{{0}} is not a latitude' })], 
								});
    }
}
