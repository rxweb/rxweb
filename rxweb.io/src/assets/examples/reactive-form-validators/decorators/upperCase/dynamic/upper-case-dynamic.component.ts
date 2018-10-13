import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-dynamic',
    templateUrl: './upper-case-dynamic.component.html'
})
export class UpperCaseDynamicComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			countryName : {
				upperCase : true  
			},
						
			stateName : {
				upperCase :  {conditionalExpression:(x,y) =>{ return  x.countryName == "INDIA" },} 
			},
						
			cityName : {
				upperCase :  {conditionalExpression:x => x.countryName == "INDIA",} 
			},
						
			colonyName : {
				upperCase :  {message:'You can enter only upperCase letters.',} 
			},
			        };
		this.locationFormGroup = this.formBuilder.formGroup(location,formBuilderConfiguration);
    }
}
