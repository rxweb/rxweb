import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-add-validator',
    templateUrl: './upper-case-add.component.html'
})
export class UpperCaseAddValidatorComponent implements OnInit {
    locationFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
										countryName:['', RxwebValidators.upperCase()], 
								});
    }
}
