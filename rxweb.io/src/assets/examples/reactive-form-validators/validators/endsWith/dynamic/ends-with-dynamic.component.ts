import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-endsWith-dynamic-validator',
    templateUrl: './ends-with-dynamic.component.html'
})
export class EndsWithDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			name : {
				endsWith :  {value:'m',message:'{{0}} does not ends with `m`',} 
			},
						
			profession : {
				endsWith :  {value:'r',conditionalExpression:(x,y) => x.name == "Adam" ,} 
			},
						
			taskId : {
				endsWith :  {value:'#',conditionalExpression:'x => x.name =="Adam"',} 
			},
			        };
		 var user = {
			name:'', profession:'', taskId:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
