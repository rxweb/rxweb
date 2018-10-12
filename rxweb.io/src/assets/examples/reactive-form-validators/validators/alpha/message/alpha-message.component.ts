import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-message-validator',
    templateUrl: './alpha-message.component.html'
})
export class AlphaMessageValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.formGroup({
										stateCode:['',RxwebValidators.alpha({message:'You can enter only alphabets.' })], 
								});
    }
}
