import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-dynamic-validator',
    templateUrl: './longitude-dynamic.component.html'
})
export class LongitudeDynamicValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			thirdCountryLongitude : {
				longitude : {conditionalExpression:'x => x.continent =="Asia"',} 
			},			
			firstCountryLongitude : {
				longitude : {message:'{{0}} is not a longitude',} 
			},
		};
		var country = { continent:'', secondCountryLongitude:'', thirdCountryLongitude:'', firstCountryLongitude:'',  }
		this.countryFormGroup = this.formBuilder.group(country,formBuilderConfiguration);
    }
}
