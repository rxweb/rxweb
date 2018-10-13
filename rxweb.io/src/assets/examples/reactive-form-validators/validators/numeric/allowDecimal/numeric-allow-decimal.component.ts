import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
	,NumericValueType
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-allowDecimal-validator',
    templateUrl: './numeric-allow-decimal.component.html'
})
export class NumericAllowDecimalValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.formGroup({
										negativeNumber:['',RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' })], 
								});
    }
}
