import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-dynamic-validator',
    templateUrl: './even-dynamic.component.html'
})
export class EvenDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var user = {
			type:'', number:'', evenNumber:'', multiplesOfEvenNumber:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
