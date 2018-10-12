import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-lessThanEqualTo-dynamic',
    templateUrl: './less-than-equal-to-dynamic.component.html'
})
export class LessThanEqualToDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			obtainedMarks : {
				lessThanEqualTo :  {fieldName:'totalMarks',conditionalExpression:(x,y) =>{ return  x.totalMarks == 100 },} 
			},
						
			practicalExamMarks : {
				lessThanEqualTo :  {fieldName:'totalMarks',conditionalExpression:x => x.totalMarks == 100,} 
			},
						
			otherMarks : {
				lessThanEqualTo :  {fieldName:'totalMarks',message:'Please enter number less than 100.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
