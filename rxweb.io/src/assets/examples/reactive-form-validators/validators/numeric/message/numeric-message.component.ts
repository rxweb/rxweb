import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-message-validator',
    templateUrl: './numeric-message.component.html'
})
export class NumericMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            negativeNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber  ,message:'{{0}} is not a negative number' })], 
        });
    }
}
