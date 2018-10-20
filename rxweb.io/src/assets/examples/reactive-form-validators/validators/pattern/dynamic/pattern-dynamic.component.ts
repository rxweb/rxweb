import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-dynamic-validator',
    templateUrl: './pattern-dynamic.component.html'
})
export class PatternDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			userName : {
				pattern :  {pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')},} 
			},
						
			zipCode : {
				pattern :  {pattern:{'zipCode':RegExp('/^\d{5}(?:[-\s]\d{4})?$/') },message:'Zipcode must be 5 digits',} 
			},
						
			contactNumber : {
				pattern :  {pattern:{'onlyDigit': RegExp('/^[0-9]*$/')},conditionalExpression:(x,y) => x.userName == "John" ,} 
			},
						
			age : {
				pattern :  {pattern:{'onlyDigit': RegExp('/^[0-9]*$/')},conditionalExpression:'x => x.userName=="John"',} 
			},
			        };
		 var user = {
			userName:'', zipCode:'', contactNumber:'', age:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
