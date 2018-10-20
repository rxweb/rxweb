import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { Country } from './country.model';

@Component({
    selector: 'app-latLong-dynamic',
    templateUrl: './lat-long-dynamic.component.html'
})
export class LatLongDynamicComponent implements OnInit {

    countryFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let country = new Country();
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
		this.countryFormGroup = this.formBuilder.formGroup(country,formBuilderConfiguration);
    }
}
