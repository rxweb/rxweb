import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-odd-dynamic-validator',
    templateUrl: './odd-dynamic.component.html'
})
export class OddDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			number : {
				odd :  {conditionalExpression:(x,y) => x.type == "Odd" ,} 
			},
						
			oddNumber : {
				odd :  {conditionalExpression:'x => x.type == "Odd"',} 
			},
						
			multiplesOfOddNumber : {
				odd :  {message:'{{0}} is not an odd number',} 
			},
			        };
		 var user = {
			type:'', number:'', oddNumber:'', multiplesOfOddNumber:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
