import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-complete-validator',
    templateUrl: './max-date-complete.component.html'
})
export class MaxDateCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																birthDate:['',RxwebValidators.maxDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => { return x.userName == "John" } })], 
													admissionDate:['',RxwebValidators.maxDate({value:new Date(2018,7,30)  ,conditionalExpression:x => x.userName == "John" })], 
													registrationDate:['',RxwebValidators.maxDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Maximum Date Limit' })], 
								});
    }
}
