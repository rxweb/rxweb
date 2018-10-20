import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-dynamic-validator',
    templateUrl: './ascii-dynamic.component.html'
})
export class AsciiDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			numberAsciiCode : {
				ascii :  {conditionalExpression:(x,y) => x.language == "Java" ,} 
			},
						
			alphabetAsciiCode : {
				ascii :  {conditionalExpression:'x => x.language =="Java"',} 
			},
						
			specialCharAsciiCode : {
				ascii :  {message:'{{0}} is not an Ascii Code',} 
			},
			        };
		 var user = {
			language:'', numberAsciiCode:'', alphabetAsciiCode:'', specialCharAsciiCode:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
