import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-dynamic-validator',
    templateUrl: './min-number-dynamic.component.html'
})
export class MinNumberDynamicValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			maths : {
				minNumber : {value:35,} 
			},			
			science : {
				minNumber : {value:35,message:'Number should not be less than 35',} 
			},			
			statstics : {
				minNumber : {value:35,conditionalExpression:'x => x.maths == 50',} 
			},
		};
		var resultInfo = { maths:'', science:'', english:'', statstics:'',  }
		this.resultInfoFormGroup = this.formBuilder.group(resultInfo,formBuilderConfiguration);
    }
}
