import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-dynamic-validator',
    templateUrl: './lower-case-dynamic.component.html'
})
export class LowerCaseDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			username : {
				lowerCase :true  
			},			
			middleName : {
				lowerCase : {conditionalExpression:'x => x.username == "jonathan.feldman"',} 
			},			
			lastName : {
				lowerCase : {message:'You can enter only lowerCase letters.',} 
			},
		};
		var user = { username:'', firstName:'', middleName:'', lastName:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
