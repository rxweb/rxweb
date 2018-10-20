import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { Country } from './country.model';

@Component({
    selector: 'app-latitude-dynamic',
    templateUrl: './latitude-dynamic.component.html'
})
export class LatitudeDynamicComponent implements OnInit {

    countryFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let country = new Country();
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
		this.countryFormGroup = this.formBuilder.formGroup(country,formBuilderConfiguration);
    }
}
