import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-message-validator',
    templateUrl: './lower-case-message.component.html'
})
export class LowerCaseMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										lastName:['', RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.' })], 
								});
    }
}
