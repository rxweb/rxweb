import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-startsWith-dynamic-validator',
    templateUrl: './starts-with-dynamic.component.html'
})
export class StartsWithDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			name : {
				startsWith :  {value:'J',message:'{{0}} does not starts with `J`',} 
			},
						
			profession : {
				startsWith :  {value:'Senior',conditionalExpression:(x,y) => x.name == "John" ,} 
			},
						
			taskId : {
				startsWith :  {value:'#',conditionalExpression:'x => x.name =="John"',} 
			},
			        };
		 var user = {
			name:'', profession:'', taskId:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
