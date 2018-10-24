import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-startsWith-dynamic',
    templateUrl: './starts-with-dynamic.component.html'
})
export class StartsWithDynamicComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
	
			name : {
				startsWith : {value:'J',message:'{{0}} does not starts with `J`',} 
			},	
	
			taskId : {
				startsWith : {value:'#',conditionalExpression:'x => x.name =="Bharat"',} 
			},		};
        this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
