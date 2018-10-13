import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-dynamic-validator',
    templateUrl: './alpha-dynamic.component.html'
})
export class AlphaDynamicValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var addressInfo = {
			countryName:'', countryCode:'', cityName:'', stateName:'', stateCode:'', 
		}
		this.addressInfoFormGroup = this.formBuilder.formGroup(addressInfo,formBuilderConfiguration);
    }
}
