import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-complete-validator',
    templateUrl: './leap-year-complete.component.html'
})
export class LeapYearCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																birthYear:['',RxwebValidators.leapYear({conditionalExpression:(x,y) =>{ return  x.name == "John" } })], 
													admissionYear:['',RxwebValidators.leapYear({conditionalExpression:x => x.name == "John" })], 
													joiningYear:['',RxwebValidators.leapYear({message:'{{0}} is not a leap year' })], 
								});
    }
}
