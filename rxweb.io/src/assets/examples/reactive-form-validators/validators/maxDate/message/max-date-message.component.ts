import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-message-validator',
    templateUrl: './max-date-message.component.html'
})
export class MaxDateMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										registrationDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Maximum Date Limit' })], 
								});
    }
}
