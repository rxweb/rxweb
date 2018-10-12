import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-dynamic',
    templateUrl: './alpha-dynamic.component.html'
})
export class AlphaDynamicComponent implements OnInit {

    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let addressInfo = new AddressInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			countryName : {
				alpha : true  
			},
						
			countryCode : {
				alpha :  {conditionalExpression:(x,y) => x.countryName == "Australia",} 
			},
						
			cityName : {
				alpha :  {conditionalExpression:'x => x.countryName =="Australia"',} 
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
