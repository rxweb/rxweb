import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-conditionalExpression-validator',
    templateUrl: './numeric-conditional-expression.component.html'
})
export class NumericConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            dataType:['',], 
            realNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.Both  ,allowDecimal:false  ,conditionalExpression:'x => x.dataType == "Number"' })], 
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false  ,conditionalExpression:(x,y) => x.dataType == "Number"  })], 
        });
    }
}
