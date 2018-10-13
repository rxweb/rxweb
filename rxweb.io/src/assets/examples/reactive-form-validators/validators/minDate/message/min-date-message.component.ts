import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-message-validator',
    templateUrl: './min-date-message.component.html'
})
export class MinDateMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
										registrationDate:['',RxwebValidators.minDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Minimum Date Limit' })], 
								});
    }
}
