import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-dynamic-validator',
    templateUrl: './max-number-dynamic.component.html'
})
export class MaxNumberDynamicValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			obtainedMarks : {
				maxNumber : {value:100,conditionalExpression:'x => x.subjectCode == "8CS5A"',} 
			},			
			passingMarks : {
				maxNumber : {value:50,message:'{{0}} exceeds the Maximum marks Limit',} 
			},
		};
		var subjectDetails = { subjectCode:'', maximumMarks:'', obtainedMarks:'', passingMarks:'',  }
		this.subjectDetailsFormGroup = this.formBuilder.group(subjectDetails,formBuilderConfiguration);
    }
}
