import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latitude-dynamic-validator',
    templateUrl: './latitude-dynamic.component.html'
})
export class LatitudeDynamicValidatorComponent implements OnInit {
    countryFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondCountryLatitude : {
				latitude :  {conditionalExpression:(x,y) => x.continent == "Asia" ,} 
			},
						
			thirdCountryLatitude : {
				latitude :  {conditionalExpression:'x => x.continent =="Asia"',} 
			},
						
			firstCountryLatitude : {
				latitude :  {message:'{{0}} is not a latitude',} 
			},
			        };
		 var country = {
			continent:'', secondCountryLatitude:'', thirdCountryLatitude:'', firstCountryLatitude:'', 
		}
		this.countryFormGroup = this.formBuilder.group(country,formBuilderConfiguration);
    }
}
