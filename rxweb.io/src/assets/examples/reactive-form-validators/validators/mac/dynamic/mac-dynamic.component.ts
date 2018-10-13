import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-dynamic-validator',
    templateUrl: './mac-dynamic.component.html'
})
export class MacDynamicValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			macAddress : {
				mac :  {conditionalExpression:(x,y) =>{ return  x.device == "Laptop" },} 
			},
						
			localMacAddress : {
				mac :  {conditionalExpression:x => x.device =="Laptop",} 
			},
						
			systemMacAddress : {
				mac :  {message:'{{0}} is not a MAC address',} 
			},
			        };
		 var macAddressInfo = {
			macAddress:'', localMacAddress:'', systemMacAddress:'', 
		}
		this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo,formBuilderConfiguration);
    }
}
