import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-complete-validator',
    templateUrl: './alpha-numeric-complete.component.html'
})
export class AlphaNumericCompleteValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.formGroup({
										areaName:['',RxwebValidators.alphaNumeric()], 
													flatAddress:['',RxwebValidators.alphaNumeric({allowWhiteSpace:true })], 
													postalAddress:['',RxwebValidators.alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' })], 
													countryCode:['',RxwebValidators.alphaNumeric({conditionalExpression:(x,y) =>{ return  x.areaName == "Boston" } })], 
													cityCode:['',RxwebValidators.alphaNumeric({conditionalExpression:x => x.areaName =="Boston" })], 
								});
    }
}
