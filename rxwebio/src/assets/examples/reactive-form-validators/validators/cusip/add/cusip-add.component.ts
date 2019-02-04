import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-cusip-add-validator',
    templateUrl: './cusip-add.component.html'
})
export class CusipAddValidatorComponent implements OnInit {
    companyInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.companyInfoFormGroup = this.formBuilder.group({
            oracleCorporationCusipCode:['', RxwebValidators.cusip()], 
        });
    }
}
