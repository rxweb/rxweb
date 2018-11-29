import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-add-validator',
    templateUrl: './different-add.component.html'
})
export class DifferentAddValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
            firstName:['',], 
            lastName:['', RxwebValidators.different({fieldName:"firstName" })], 
        });
    }
}
