import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-lessThan-dynamic',
    templateUrl: './less-than-dynamic.component.html'
})
export class LessThanDynamicComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
	
	
			passingMarks : {
				lessThan : {fieldName:'obtainedMarks',conditionalExpression:'x => x.obtainedMarks < 35',} 
			},	
			otherMarks : {
				lessThan : {fieldName:'obtainedMarks',message:'Please enter number greater than 100.',} 
			},		};
        this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
