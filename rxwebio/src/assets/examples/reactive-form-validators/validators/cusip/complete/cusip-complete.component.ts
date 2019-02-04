import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-cusip-complete-validator',
    templateUrl: './cusip-complete.component.html'
})
export class CusipCompleteValidatorComponent implements OnInit {
    companyInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.companyInfoFormGroup = this.formBuilder.group({
            companyName:['',], 
            oracleCorporationCusipCode:['', RxwebValidators.cusip()], 
            googleIncCusipCode:['', RxwebValidators.cusip({conditionalExpression:(x,y) => x.companyName == "Google"  })], 
            microsoftCorporationCusipCode:['', RxwebValidators.cusip({conditionalExpression:'x => x.companyName =="Microsoft"' })], 
            appleIncCusipCode:['', RxwebValidators.cusip({message:'{{0}} is not a valid cusip Code' })], 
        });
    }
}
