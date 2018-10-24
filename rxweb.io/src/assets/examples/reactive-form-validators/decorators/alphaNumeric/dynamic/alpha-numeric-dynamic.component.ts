import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-alphaNumeric-dynamic',
    templateUrl: './alpha-numeric-dynamic.component.html'
})
export class AlphaNumericDynamicComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
	
			areaName : {
				alphaNumeric :true  
			},	
			flatAddress : {
				alphaNumeric : {allowWhiteSpace:true,} 
			},	
			postalAddress : {
				alphaNumeric : {allowWhiteSpace:true,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.',} 
			},	
	
			cityCode : {
				alphaNumeric : {conditionalExpression:'x => x.areaName =="Delhi"',} 
			},		};
        this.locationFormGroup = this.formBuilder.formGroup(location,formBuilderConfiguration);
    }
}
