import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-allowWhiteSpace-validator',
    templateUrl: './alpha-numeric-allow-white-space.component.html'
})
export class AlphaNumericAllowWhiteSpaceValidatorComponent implements OnInit {
    locationFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
										postalAddress:['', RxwebValidators.alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' })], 
								});
    }
}
