import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-add-validator',
    templateUrl: './lower-case-add.component.html'
})
export class LowerCaseAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            username:['', RxwebValidators.lowerCase()], 
        });
    }
}
