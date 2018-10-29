import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-complete-validator',
    templateUrl: './alpha-numeric-complete.component.html'
})
export class AlphaNumericCompleteValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            areaName:['', RxwebValidators.alphaNumeric()], 
            flatAddress:['', RxwebValidators.alphaNumeric({allowWhiteSpace:true })], 
            postalAddress:['', RxwebValidators.alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' })], 
            countryCode:['', RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi"  })], 
            cityCode:['', RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"' })], 
        });
    }
}
