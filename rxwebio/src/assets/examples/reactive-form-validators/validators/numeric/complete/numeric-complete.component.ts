import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-complete-validator',
    templateUrl: './numeric-complete.component.html'
})
export class NumericCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				dataTypes = [ "Real", "Positive",];
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            dataType:['',], 
            negativeNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,message:'{{0}} is not a negative number' })], 
            decimalNumber:['', RxwebValidators.numeric({allowDecimal:true  ,message:'{{0}} is not a decimal number' })], 
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,conditionalExpression:(x,y) => x.dataType == "Positive"  })], 
            realNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.Both  ,conditionalExpression:'x => x.dataType == "Real"' })], 
        });
    }
}
