import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latLong-dynamic-validator',
    templateUrl: './lat-long-dynamic.component.html'
})
export class LatLongDynamicValidatorComponent implements OnInit {
    countryFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondCountry : {
				latLong :  {conditionalExpression:(x,y) => x.continent == "Asia" ,} 
			},
						
			thirdCountry : {
				latLong :  {conditionalExpression:'x => x.continent =="Asia"',} 
			},
						
			firstCountry : {
				latLong :  {message:'{{0}} is not a proper proper Latitude or Longitude',} 
			},
			        };
		 var country = {
			continent:'', secondCountry:'', thirdCountry:'', firstCountry:'', 
		}
		this.countryFormGroup = this.formBuilder.group(country,formBuilderConfiguration);
    }
}
