import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-add-validator',
    templateUrl: './longitude-add.component.html'
})
export class LongitudeAddValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
										firstCountryLongitude:['', RxwebValidators.longitude()], 
								});
    }
}
