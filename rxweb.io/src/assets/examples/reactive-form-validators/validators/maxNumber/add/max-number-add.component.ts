import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-add-validator',
    templateUrl: './max-number-add.component.html'
})
export class MaxNumberAddValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.subjectDetailsFormGroup = this.formBuilder.formGroup({
										passingMarks:['',RxwebValidators.maxNumber({value:50 })], 
								});
    }
}
