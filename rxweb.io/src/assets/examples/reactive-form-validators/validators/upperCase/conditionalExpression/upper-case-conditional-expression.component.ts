import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-conditionalExpression-validator',
    templateUrl: './upper-case-conditional-expression.component.html'
})
export class UpperCaseConditionalExpressionValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.formGroup({
										countryName:['',RxwebValidators.upperCase()], 
													cityName:['',RxwebValidators.upperCase({conditionalExpression:x => x.countryName == "INDIA" })], 
													stateName:['',RxwebValidators.upperCase({conditionalExpression:(x,y) =>{ return  x.countryName == "INDIA" } })], 
								});
    }
}
