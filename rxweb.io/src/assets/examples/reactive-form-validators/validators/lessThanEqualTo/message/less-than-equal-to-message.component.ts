import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-message-validator',
    templateUrl: './less-than-equal-to-message.component.html'
})
export class LessThanEqualToMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										totalMarks:['',], 
													practicalExamMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:'x => x.totalMarks == 100' })], 
													otherMarks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'  ,message:'Please enter number less than 100.' })], 
								});
    }
}
