import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-dynamic-validator',
    templateUrl: './alpha-numeric-dynamic.component.html'
})
export class AlphaNumericDynamicValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
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
			},
		};
		var location = { areaName:'', flatAddress:'', postalAddress:'', countryCode:'', cityCode:'',  }
		this.locationFormGroup = this.formBuilder.group(location,formBuilderConfiguration);
    }
}
