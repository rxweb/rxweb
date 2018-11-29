import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-conditionalExpression-validator',
    templateUrl: './numeric-conditional-expression.component.html'
})
export class NumericConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				dataTypes = [ "Real", "Positive",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            dataType:['',], 
            realNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.Both  ,conditionalExpression:'x => x.dataType == "Real"' })], 
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,conditionalExpression:(x,y) => x.dataType == "Positive"  })], 
        });
    }
}
