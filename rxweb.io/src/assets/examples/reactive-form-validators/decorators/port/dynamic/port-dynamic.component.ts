import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-port-dynamic',
    templateUrl: './port-dynamic.component.html'
})
export class PortDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			entertainmentWebsitePort : {
				port :  {conditionalExpression:(x,y) => x.browser == "Chrome" ,} 
			},
						
			shoppingWebsitePort : {
				port :  {conditionalExpression:'x => x.browser =="Chrome"',} 
			},
						
			educationalWebsitePort : {
				port :  {message:'{{0}} is not a proper port number',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
