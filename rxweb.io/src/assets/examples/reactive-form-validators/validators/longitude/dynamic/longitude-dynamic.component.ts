import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-dynamic-validator',
    templateUrl: './longitude-dynamic.component.html'
})
export class LongitudeDynamicValidatorComponent implements OnInit {
    countryFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondCountryLongitude : {
				longitude :  {conditionalExpression:(x,y) => x.continent == "Asia" ,} 
			},
						
			thirdCountryLongitude : {
				longitude :  {conditionalExpression:'x => x.continent =="Asia"',} 
			},
						
			firstCountryLongitude : {
				longitude :  {message:'{{0}} is not a longitude',} 
			},
			        };
		 var country = {
			continent:'', secondCountryLongitude:'', thirdCountryLongitude:'', firstCountryLongitude:'', 
		}
		this.countryFormGroup = this.formBuilder.group(country,formBuilderConfiguration);
    }
}
