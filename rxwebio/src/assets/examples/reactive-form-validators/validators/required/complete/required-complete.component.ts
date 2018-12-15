import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-required-complete-validator',
    templateUrl: './required-complete.component.html'
})
export class RequiredCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.required()], 
            middleName:['', RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat"  })], 
            lastName:['', RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"' })], 
            userName:['', RxwebValidators.required({message:'Username cannot be blank.' })], 
        });
    }
}
