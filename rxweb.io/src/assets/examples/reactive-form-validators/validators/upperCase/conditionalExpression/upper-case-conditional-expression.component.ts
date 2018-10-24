import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-conditionalExpression-validator',
    templateUrl: './upper-case-conditional-expression.component.html'
})
export class UpperCaseConditionalExpressionValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.upperCase()], 
            cityName:['', RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"' })], 
            stateName:['', RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA"  })], 
        });
    }
}
