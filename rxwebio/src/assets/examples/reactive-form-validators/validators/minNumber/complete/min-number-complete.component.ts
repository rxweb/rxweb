import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-complete-validator',
    templateUrl: './min-number-complete.component.html'
})
export class MinNumberCompleteValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.group({
            maths:['', RxwebValidators.minNumber({value:35 })], 
            science:['', RxwebValidators.minNumber({value:35  ,message:'Number should not be less than 35' })], 
            english:['', RxwebValidators.minNumber({value:35  ,conditionalExpression:(x,y) => x.maths == 50  })], 
            statstics:['', RxwebValidators.minNumber({value:35  ,conditionalExpression:'x => x.maths == 50' })], 
        });
    }
}
