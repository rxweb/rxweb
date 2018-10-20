import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-even-dynamic',
    templateUrl: './even-dynamic.component.html'
})
export class EvenDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			number : {
				even :  {conditionalExpression:(x,y) => x.type == "Even" ,} 
			},
						
			evenNumber : {
				even :  {conditionalExpression:'x => x.type == "Even"',} 
			},
						
			multiplesOfEvenNumber : {
				even :  {message:'{{0}} is not an even number',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
