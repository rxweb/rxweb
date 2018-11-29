import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-message-validator',
    templateUrl: './greater-than-message.component.html'
})
export class GreaterThanMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:'x => x.age > 17' })], 
            otherAge:['', RxwebValidators.greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' })], 
        });
    }
}
