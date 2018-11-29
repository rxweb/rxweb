import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-add-validator',
    templateUrl: './numeric-add.component.html'
})
export class NumericAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false })], 
        });
    }
}
