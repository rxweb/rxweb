import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-add-validator',
    templateUrl: './min-number-add.component.html'
})
export class MinNumberAddValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.formGroup({
										maths:['',RxwebValidators.minNumber({value:35 })], 
								});
    }
}
