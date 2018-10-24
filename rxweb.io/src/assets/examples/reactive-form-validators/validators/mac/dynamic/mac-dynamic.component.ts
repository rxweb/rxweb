import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-dynamic-validator',
    templateUrl: './mac-dynamic.component.html'
})
export class MacDynamicValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			localMacAddress : {
				mac : {conditionalExpression:'x => x.device =="Laptop"',} 
			},			
			systemMacAddress : {
				mac : {message:'{{0}} is not a MAC address',} 
			},
		};
		var macAddressInfo = { device:'', macAddress:'', localMacAddress:'', systemMacAddress:'',  }
		this.macAddressInfoFormGroup = this.formBuilder.group(macAddressInfo,formBuilderConfiguration);
    }
}
