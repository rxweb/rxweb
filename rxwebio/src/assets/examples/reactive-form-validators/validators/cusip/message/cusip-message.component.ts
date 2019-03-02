import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-cusip-message-validator',
    templateUrl: './cusip-message.component.html'
})
export class CusipMessageValidatorComponent implements OnInit {
    companyInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.companyInfoFormGroup = this.formBuilder.group({
            appleIncCusipCode:['', RxwebValidators.cusip({message:'{{0}} is not a valid cusip Code' })], 
        });
    }
}
