import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-acceptValue-validator',
    templateUrl: './numeric-accept-value.component.html'
})
export class NumericAcceptValueValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            negativeNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' })], 
        });
    }
}
