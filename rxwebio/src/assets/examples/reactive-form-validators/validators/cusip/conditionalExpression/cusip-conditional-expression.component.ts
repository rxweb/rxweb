import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-cusip-conditionalExpression-validator',
    templateUrl: './cusip-conditional-expression.component.html'
})
export class CusipConditionalExpressionValidatorComponent implements OnInit {
    companyInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.companyInfoFormGroup = this.formBuilder.group({
            companyName:['',], 
            microsoftCorporationCusipCode:['', RxwebValidators.cusip({conditionalExpression:'x => x.companyName =="Microsoft"' })], 
            googleIncCusipCode:['', RxwebValidators.cusip({conditionalExpression:(x,y) => x.companyName == "Google"  })], 
        });
    }
}
