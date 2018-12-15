import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-complete-validator',
    templateUrl: './lower-case-complete.component.html'
})
export class LowerCaseCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            username:['', RxwebValidators.lowerCase()], 
            firstName:['', RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman"  })], 
            middleName:['', RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"' })], 
            lastName:['', RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.' })], 
        });
    }
}
