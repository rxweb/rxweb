import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-dynamic-validator',
    templateUrl: './alpha-numeric-dynamic.component.html'
})
export class AlphaNumericDynamicValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			areaName : {
				alphaNumeric : true  
			},
						
			flatAddress : {
				alphaNumeric :  {allowWhiteSpace:true,} 
			},
						
			postalAddress : {
				alphaNumeric :  {allowWhiteSpace:true,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.',} 
			},
						
			countryCode : {
				alphaNumeric :  {conditionalExpression:(x,y) => x.areaName == "Boston" ,} 
			},
						
			cityCode : {
				alphaNumeric :  {conditionalExpression:'x => x.areaName =="Boston"',} 
			},
			        };
		 var location = {
			areaName:'', flatAddress:'', postalAddress:'', countryCode:'', cityCode:'', 
		}
		this.locationFormGroup = this.formBuilder.group(location,formBuilderConfiguration);
    }
}
