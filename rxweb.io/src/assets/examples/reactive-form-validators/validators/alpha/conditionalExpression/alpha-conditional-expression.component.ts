import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-conditionalExpression-validator',
    templateUrl: './alpha-conditional-expression.component.html'
})
export class AlphaConditionalExpressionValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.alpha()], 
            cityName:['', RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="India"' })], 
            countryCode:['', RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "India" })], 
        });
    }
}
