import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { Country } from './country.model';

@Component({
    selector: 'app-longitude-dynamic',
    templateUrl: './longitude-dynamic.component.html'
})
export class LongitudeDynamicComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let country = new Country();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
	
	
			thirdCountryLongitude : {
				longitude : {conditionalExpression:'x => x.continent =="Asia"',} 
			},	
			firstCountryLongitude : {
				longitude : {message:'{{0}} is not a longitude',} 
			},		};
        this.countryFormGroup = this.formBuilder.formGroup(country,formBuilderConfiguration);
    }
}
