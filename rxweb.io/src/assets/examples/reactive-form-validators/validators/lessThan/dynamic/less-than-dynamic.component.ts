import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-dynamic-validator',
    templateUrl: './less-than-dynamic.component.html'
})
export class LessThanDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			passingMarks : {
				lessThan : {fieldName:'obtainedMarks',conditionalExpression:'x => x.obtainedMarks < 35',} 
			},			
			otherMarks : {
				lessThan : {fieldName:'obtainedMarks',message:'Please enter number greater than 100.',} 
			},
		};
		var user = { obtainedMarks:'', practicalExamMarks:'', passingMarks:'', otherMarks:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
