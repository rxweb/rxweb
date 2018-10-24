import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-dynamic-validator',
    templateUrl: './port-dynamic.component.html'
})
export class PortDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			shoppingWebsitePort : {
				port : {conditionalExpression:'x => x.browser =="Chrome"',} 
			},			
			educationalWebsitePort : {
				port : {message:'{{0}} is not a proper port number',} 
			},
		};
		var user = { browser:'', entertainmentWebsitePort:'', shoppingWebsitePort:'', educationalWebsitePort:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
