import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-message-validator',
    templateUrl: './different-message.component.html'
})
export class DifferentMessageValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.formGroup({
																userName:['',RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:x => x.firstName == "John" })], 
													password:['',RxwebValidators.different({fieldName:"firstName"  ,message:'{{0}} is same as firstName' })], 
								});
    }
}
