import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-odd-dynamic',
    templateUrl: './odd-dynamic.component.html'
})
export class OddDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
