import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-complete-validator',
    templateUrl: './less-than-equal-to-complete.component.html'
})
export class LessThanEqualToCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										totalMarks:['',], 
													obtainedMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:(x,y) => x.totalMarks == 100  })], 
													practicalExamMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:'x => x.totalMarks == 100' })], 
													otherMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,message:'Please enter number less than 100.' })], 
								});
    }
}
