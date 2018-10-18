import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latitude-add-validator',
    templateUrl: './latitude-add.component.html'
})
export class LatitudeAddValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
										firstCountryLatitude:['', RxwebValidators.latitude()], 
								});
    }
}
