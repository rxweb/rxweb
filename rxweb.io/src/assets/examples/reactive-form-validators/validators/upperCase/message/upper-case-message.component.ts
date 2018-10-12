import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-message-validator',
    templateUrl: './upper-case-message.component.html'
})
export class UpperCaseMessageValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.formGroup({
										colonyName:['',RxwebValidators.upperCase({message:'You can enter only upperCase letters.' })], 
								});
    }
}
