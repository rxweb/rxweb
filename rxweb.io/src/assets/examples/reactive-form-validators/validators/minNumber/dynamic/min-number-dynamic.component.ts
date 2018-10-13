import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-dynamic-validator',
    templateUrl: './min-number-dynamic.component.html'
})
export class MinNumberDynamicValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			maths : {
				minNumber :  {value:35,} 
			},
						
			science : {
				minNumber :  {value:35,message:'Number should not be less than 35',} 
			},
						
			english : {
				minNumber :  {value:35,conditionalExpression:(x,y) =>{ return  x.maths == 50 },} 
			},
						
			statstics : {
				minNumber :  {value:35,conditionalExpression:x => x.maths == 50,} 
			},
			        };
		 var resultInfo = {
			maths:'', science:'', english:'', statstics:'', 
		}
		this.resultInfoFormGroup = this.formBuilder.formGroup(resultInfo,formBuilderConfiguration);
    }
}
