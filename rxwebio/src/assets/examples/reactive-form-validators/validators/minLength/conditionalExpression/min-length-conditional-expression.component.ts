import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-conditionalExpression-validator',
    templateUrl: './min-length-conditional-expression.component.html'
})
export class MinLengthConditionalExpressionValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.group({
            countryName:['',], 
            stateCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:'x => x.countryName == "India"' })], 
            countryCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:(x,y)=> x.countryName == "India" })], 
        });
    }
}
