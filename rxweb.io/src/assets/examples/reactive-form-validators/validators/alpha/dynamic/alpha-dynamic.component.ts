import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-dynamic-validator',
    templateUrl: './alpha-dynamic.component.html'
})
export class AlphaDynamicValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			countryName : {
				alpha :true  
			},			
			cityName : {
				alpha : {conditionalExpression:'x => x.countryName =="India"',} 
			},			
			stateName : {
				alpha : {allowWhiteSpace:true,} 
			},			
			stateCode : {
				alpha : {message:'You can enter only alphabets.',} 
			},
		};
		var addressInfo = { countryName:'', countryCode:'', cityName:'', stateName:'', stateCode:'',  }
		this.addressInfoFormGroup = this.formBuilder.group(addressInfo,formBuilderConfiguration);
    }
}
