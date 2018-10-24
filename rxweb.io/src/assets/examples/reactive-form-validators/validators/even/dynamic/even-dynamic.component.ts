import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-dynamic-validator',
    templateUrl: './even-dynamic.component.html'
})
export class EvenDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			evenNumber : {
				even : {conditionalExpression:'x => x.type == "Even"',} 
			},			
			multiplesOfEvenNumber : {
				even : {message:'{{0}} is not an even number',} 
			},
		};
		var user = { type:'', number:'', evenNumber:'', multiplesOfEvenNumber:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
