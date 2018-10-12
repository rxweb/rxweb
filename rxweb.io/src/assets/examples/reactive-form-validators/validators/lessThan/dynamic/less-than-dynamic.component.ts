import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-dynamic-validator',
    templateUrl: './less-than-dynamic.component.html'
})
export class LessThanDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			practicalExamMarks : {
				lessThan :  {fieldName:'obtainedMarks',conditionalExpression:(x,y) =>{ return  x.obtainedMarks < 35},} 
			},
						
			passingMarks : {
				lessThan :  {fieldName:'obtainedMarks',conditionalExpression:x => x.obtainedMarks < 35 ,} 
			},
						
			otherMarks : {
				lessThan :  {fieldName:'obtainedMarks',message:'Please enter number greater than 100.',} 
			},
			        };
		 var user = {
			practicalExamMarks:'', passingMarks:'', otherMarks:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
