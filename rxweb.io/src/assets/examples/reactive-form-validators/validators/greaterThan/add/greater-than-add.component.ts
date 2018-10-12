import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-add-validator',
    templateUrl: './greater-than-add.component.html'
})
export class GreaterThanAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																voterAge:['',RxwebValidators.greaterThan({fieldName:'age' })], 
								});
    }
}
