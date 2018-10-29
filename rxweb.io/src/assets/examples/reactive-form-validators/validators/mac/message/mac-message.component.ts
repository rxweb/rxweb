import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-message-validator',
    templateUrl: './mac-message.component.html'
})
export class MacMessageValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
            systemMacAddress:['', RxwebValidators.mac({message:'{{0}} is not a MAC address' })], 
        });
    }
}
