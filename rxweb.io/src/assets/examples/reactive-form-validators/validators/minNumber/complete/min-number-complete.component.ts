import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-complete-validator',
    templateUrl: './min-number-complete.component.html'
})
export class MinNumberCompleteValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.formGroup({
										maths:['',RxwebValidators.minNumber({value:35 })], 
													science:['',RxwebValidators.minNumber({value:35  ,message:'Number should not be less than 35' })], 
													english:['',RxwebValidators.minNumber({value:35  ,conditionalExpression:(x,y) =>{ return  x.maths == 50 } })], 
													statstics:['',RxwebValidators.minNumber({value:35  ,conditionalExpression:x => x.maths == 50 })], 
								});
    }
}
