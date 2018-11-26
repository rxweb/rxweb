import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-conditionalExpression-validator',
    templateUrl: './min-date-conditional-expression.component.html'
})
export class MinDateConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['',], 
            admissionDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "Bharat"' })], 
            birthDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
        });
    }
}
