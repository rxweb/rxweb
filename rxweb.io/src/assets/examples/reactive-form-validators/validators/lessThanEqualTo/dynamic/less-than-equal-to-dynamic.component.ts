import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-dynamic-validator',
    templateUrl: './less-than-equal-to-dynamic.component.html'
})
export class LessThanEqualToDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			practicalExamMarks : {
				lessThanEqualTo : {fieldName:'totalMarks',conditionalExpression:'x => x.totalMarks == 100',} 
			},			
			otherMarks : {
				lessThanEqualTo : {fieldName:'totalMarks',message:'Please enter number less than 100.',} 
			},
		};
		var user = { totalMarks:'', obtainedMarks:'', practicalExamMarks:'', otherMarks:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
