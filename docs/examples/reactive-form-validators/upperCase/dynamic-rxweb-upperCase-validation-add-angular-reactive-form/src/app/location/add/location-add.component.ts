import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { Location } from '../location.model';

@Component({
    selector: 'app-location-add',
    templateUrl: './location-add.component.html'
})
export class LocationAddComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			countryName : {
				upperCase : true  
			},
			stateName : {
				upperCase :  {conditionalExpressions:'x => x.countryName == "INDIA"',} 
			},
			cityName : {
				upperCase :  {message:'You can enter only upperCase letters.',} 
			},
        };
		this.locationFormGroup = this.formBuilder.formGroup(location,formBuilderConfiguration);
    }
}
