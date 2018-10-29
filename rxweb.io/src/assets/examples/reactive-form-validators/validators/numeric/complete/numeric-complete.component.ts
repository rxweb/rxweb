import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-complete-validator',
    templateUrl: './numeric-complete.component.html'
})
export class NumericCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            dataType:['',], 
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false  ,conditionalExpression:(x,y) => x.dataType == "Number"  })], 
            realNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.Both  ,allowDecimal:false  ,conditionalExpression:'x => x.dataType == "Number"' })], 
            negativeNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' })], 
        });
    }
}
