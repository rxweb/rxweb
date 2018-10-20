import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-message-validator',
    templateUrl: './contains-message.component.html'
})
export class ContainsMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										otherEmailAddress:['', RxwebValidators.contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' })], 
								});
    }
}
