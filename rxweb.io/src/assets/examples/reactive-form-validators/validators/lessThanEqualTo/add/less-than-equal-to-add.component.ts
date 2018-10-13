import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lessThanEqualTo-add-validator',
    templateUrl: './less-than-equal-to-add.component.html'
})
export class LessThanEqualToAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																marks:['',RxwebValidators.lessThanEqualTo({fieldName:'totalMarks' })], 
								});
    }
}
