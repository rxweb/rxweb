import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration  } from '@rxweb/reactive-form-validators';

import { AddressInfo } from '../address-info.model';

@Component({
    selector: 'app-address-info-add',
    templateUrl: './address-info-add.component.html'
})
export class AddressInfoAddComponent implements OnInit {

    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let addressInfo = new AddressInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			countryName : {
				alpha : true  
			},
			countryCode : {
				alpha :  {conditionalExpressions:'x, y => x.countryName == "Australia" ',} 
			},
			stateName : {
				alpha :  {allowWhiteSpace:true,} 
			},
			stateCode : {
				alpha :  {message:'You can enter only alphabets.',} 
			},
        };
		this.addressInfoFormGroup = this.formBuilder.formGroup(addressInfo,formBuilderConfiguration);
    }
}
