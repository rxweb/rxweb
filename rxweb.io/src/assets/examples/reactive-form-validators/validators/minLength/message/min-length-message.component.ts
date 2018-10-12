import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-message-validator',
    templateUrl: './min-length-message.component.html'
})
export class MinLengthMessageValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.formGroup({
										landLineNo:['',RxwebValidators.minLength({value:8  ,message:'Minimum 8 characters are allowed' })], 
								});
    }
}
