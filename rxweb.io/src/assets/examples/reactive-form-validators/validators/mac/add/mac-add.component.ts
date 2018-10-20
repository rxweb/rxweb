import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-add-validator',
    templateUrl: './mac-add.component.html'
})
export class MacAddValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
										systemMacAddress:['', RxwebValidators.mac()], 
								});
    }
}
