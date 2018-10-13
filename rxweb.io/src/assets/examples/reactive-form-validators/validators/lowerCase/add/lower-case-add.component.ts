import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-add-validator',
    templateUrl: './lower-case-add.component.html'
})
export class LowerCaseAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.formGroup({
										username:['',RxwebValidators.lowerCase()], 
								});
    }
}
