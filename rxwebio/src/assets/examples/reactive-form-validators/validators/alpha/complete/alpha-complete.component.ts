import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-complete-validator',
    templateUrl: './alpha-complete.component.html'
})
export class AlphaCompleteValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.alpha()], 
            countryCode:['', RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "India" })], 
            cityName:['', RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="India"' })], 
            stateName:['', RxwebValidators.alpha({allowWhiteSpace:true })], 
            stateCode:['', RxwebValidators.alpha({message:'You can enter only alphabets.' })], 
        });
    }
}
