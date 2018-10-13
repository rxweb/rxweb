import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-add-validator',
    templateUrl: './greater-than-equal-to-add.component.html'
})
export class GreaterThanEqualToAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																voterAge:['',RxwebValidators.greaterThanEqualTo({fieldName:'age' })], 
								});
    }
}
