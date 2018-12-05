import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-conditionalExpression-validator',
    templateUrl: './leap-year-conditional-expression.component.html'
})
export class LeapYearConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['',], 
            admissionYear:['', RxwebValidators.leapYear({conditionalExpression:'x => x.name == "Bharat"' })], 
            birthYear:['', RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "Bharat"  })], 
        });
    }
}
