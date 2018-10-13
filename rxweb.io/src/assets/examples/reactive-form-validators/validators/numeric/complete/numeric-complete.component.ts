import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
	,NumericValueType
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-complete-validator',
    templateUrl: './numeric-complete.component.html'
})
export class NumericCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.formGroup({
																integerNumber:['',RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false  ,conditionalExpression:(x,y) =>{ return  x.dataType == "Number" } })], 
													realNumber:['',RxwebValidators.numeric({acceptValue:NumericValueType.Both  ,allowDecimal:false  ,conditionalExpression:x => x.dataType == "Number" })], 
													negativeNumber:['',RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' })], 
								});
    }
}
