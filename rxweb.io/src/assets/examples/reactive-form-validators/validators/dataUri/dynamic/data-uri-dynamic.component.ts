import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-dynamic-validator',
    templateUrl: './data-uri-dynamic.component.html'
})
export class DataUriDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			javascriptDataUri : {
				dataUri : {conditionalExpression:'x => x.scheme =="DataUri"',} 
			},			
			htmlDataUri : {
				dataUri : {message:'{{0}} is not a proper data URI',} 
			},
		};
		var user = { scheme:'', cssDataUri:'', javascriptDataUri:'', htmlDataUri:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
