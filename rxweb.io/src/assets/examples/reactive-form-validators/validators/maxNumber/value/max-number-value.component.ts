import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-value-validator',
    templateUrl: './max-number-value.component.html'
})
export class MaxNumberValueValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.group({
										passingMarks:['', RxwebValidators.maxNumber({value:50  ,message:'{{0}} exceeds the Maximum marks Limit' })], 
								});
    }
}
