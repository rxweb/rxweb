import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-dynamic-validator',
    templateUrl: './port-dynamic.component.html'
})
export class PortDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var user = {
			browser:'', entertainmentWebsitePort:'', shoppingWebsitePort:'', educationalWebsitePort:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
