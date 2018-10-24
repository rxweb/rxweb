import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latLong-dynamic-validator',
    templateUrl: './lat-long-dynamic.component.html'
})
export class LatLongDynamicValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			thirdCountry : {
				latLong : {conditionalExpression:'x => x.continent =="Asia"',} 
			},			
			firstCountry : {
				latLong : {message:'{{0}} is not a proper proper Latitude or Longitude',} 
			},
		};
		var country = { continent:'', secondCountry:'', thirdCountry:'', firstCountry:'',  }
		this.countryFormGroup = this.formBuilder.group(country,formBuilderConfiguration);
    }
}
