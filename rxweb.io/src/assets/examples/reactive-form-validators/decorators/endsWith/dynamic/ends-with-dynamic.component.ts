import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-endsWith-dynamic',
    templateUrl: './ends-with-dynamic.component.html'
})
export class EndsWithDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
