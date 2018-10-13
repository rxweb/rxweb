import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-add-validator',
    templateUrl: './alpha-numeric-add.component.html'
})
export class AlphaNumericAddValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.formGroup({
										areaName:['',RxwebValidators.alphaNumeric()], 
								});
    }
}
