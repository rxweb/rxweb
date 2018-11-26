import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-conditionalExpression-validator',
    templateUrl: './alpha-numeric-conditional-expression.component.html'
})
export class AlphaNumericConditionalExpressionValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            areaName:['', RxwebValidators.alphaNumeric()], 
            cityCode:['', RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"' })], 
            countryCode:['', RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi"  })], 
        });
    }
}
