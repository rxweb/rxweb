import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-ascii-dynamic',
    templateUrl: './ascii-dynamic.component.html'
})
export class AsciiDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			numberAsciiCode : {
				ascii :  {conditionalExpression:(x,y) => x.language == "Java" ,} 
			},
						
			alphabetAsciiCode : {
				ascii :  {conditionalExpression:'x => x.language =="Java"',} 
			},
						
			specialCharAsciiCode : {
				ascii :  {message:'{{0}} is not an Ascii Code',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
