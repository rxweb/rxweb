import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThan-complete-validator',
    templateUrl: './less-than-complete.component.html'
})
export class LessThanCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										obtainedMarks:['',], 
													practicalExamMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>  x.obtainedMarks < 35 })], 
													passingMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:'x => x.obtainedMarks < 35' })], 
													otherMarks:['', RxwebValidators.lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' })], 
								});
    }
}
