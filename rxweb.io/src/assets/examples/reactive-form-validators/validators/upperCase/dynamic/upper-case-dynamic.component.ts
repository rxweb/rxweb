import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-dynamic-validator',
    templateUrl: './upper-case-dynamic.component.html'
})
export class UpperCaseDynamicValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			countryName : {
				upperCase : true  
			},
						
			stateName : {
				upperCase :  {conditionalExpression:(x,y) => x.countryName == "INDIA" ,} 
			},
						
			cityName : {
				upperCase :  {conditionalExpression:'x => x.countryName == "INDIA"',} 
			},
						
			colonyName : {
				upperCase :  {message:'You can enter only upperCase letters.',} 
			},
			        };
		 var location = {
			countryName:'', stateName:'', cityName:'', colonyName:'', 
		}
		this.locationFormGroup = this.formBuilder.group(location,formBuilderConfiguration);
    }
}
