import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-message-validator',
    templateUrl: './mac-message.component.html'
})
export class MacMessageValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
										systemMacAddress:['', RxwebValidators.mac({message:'{{0}} is not a MAC address' })], 
								});
    }
}
