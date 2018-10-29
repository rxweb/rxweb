import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-message-validator',
    templateUrl: './different-message.component.html'
})
export class DifferentMessageValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
            firstName:['',], 
            userName:['', RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:'x => x.firstName == "Bharat"' })], 
            password:['', RxwebValidators.different({fieldName:"firstName"  ,message:'{{0}} is same as firstName' })], 
        });
    }
}
