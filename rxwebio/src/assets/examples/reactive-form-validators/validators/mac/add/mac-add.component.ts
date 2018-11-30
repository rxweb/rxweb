import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-add-validator',
    templateUrl: './mac-add.component.html'
})
export class MacAddValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
            systemMacAddress:['', RxwebValidators.mac()], 
        });
    }
}
