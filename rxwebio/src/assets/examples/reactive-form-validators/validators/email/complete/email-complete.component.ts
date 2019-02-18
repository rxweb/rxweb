import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-complete-validator',
    templateUrl: './email-complete.component.html'
})
export class EmailCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            email:['', RxwebValidators.email()], 
            recoveryEmailAddress:['', RxwebValidators.email({conditionalExpression:(x,y) => x.email == "bharat.patel@gmail.com"  })], 
            businessEmailAddress:['', RxwebValidators.email({conditionalExpression:'x => x.email =="bharat.patel@gmail.com"' })], 
            otherEmailAddress:['', RxwebValidators.email({message:'Please enter valid email' })], 
        });
    }
}
