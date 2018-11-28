import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"

import { RxFormBuilder,FormBuilderConfiguration,RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-reactive-form-based-validation',
    templateUrl: './reactive-form-based-validation.component.html'
})
export class ReactiveFormBasedValidationComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['', RxwebValidators.alpha()], 
          lastName:['', RxwebValidators.alpha()]
        });
    }
}
