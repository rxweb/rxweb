import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-message-validator',
    templateUrl: './max-length-message.component.html'
})
export class MaxLengthMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										userName:['', RxwebValidators.maxLength({value:10  ,message:'Maximum 10 characters are allowed' })], 
								});
    }
}
