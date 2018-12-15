import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-complete-validator',
    templateUrl: './leap-year-complete.component.html'
})
export class LeapYearCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['',], 
            birthYear:['', RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "Bharat"  })], 
            admissionYear:['', RxwebValidators.leapYear({conditionalExpression:'x => x.name == "Bharat"' })], 
            joiningYear:['', RxwebValidators.leapYear({message:'{{0}} is not a leap year' })], 
        });
    }
}
