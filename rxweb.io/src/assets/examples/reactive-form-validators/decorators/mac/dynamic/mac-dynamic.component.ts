import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-dynamic',
    templateUrl: './mac-dynamic.component.html'
})
export class MacDynamicComponent implements OnInit {

    macAddressInfoFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			macAddress : {
				mac :  {conditionalExpression:(x,y) => x.device == "Laptop" ,} 
			},
						
			localMacAddress : {
				mac :  {conditionalExpression:'x => x.device =="Laptop"',} 
			},
						
			systemMacAddress : {
				mac :  {message:'{{0}} is not a MAC address',} 
			},
			        };
		this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo,formBuilderConfiguration);
    }
}
