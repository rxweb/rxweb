import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-complete-validator',
    templateUrl: './email-complete.component.html'
})
export class EmailCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										email:['', RxwebValidators.email()], 
													recoveryEmailAddress:['', RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com"  })], 
													businessEmailAddress:['', RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"' })], 
													otherEmailAddress:['', RxwebValidators.email({message:'Please enter valid email' })], 
								});
    }
}
