import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
	,NumericValueType
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-message-validator',
    templateUrl: './numeric-message.component.html'
})
export class NumericMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
										negativeNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' })], 
								});
    }
}
