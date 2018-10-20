import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-digit-message-validator',
    templateUrl: './digit-message.component.html'
})
export class DigitMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										mobileNumber:['', RxwebValidators.digit({message:'Please enter only digit.' })], 
								});
    }
}
