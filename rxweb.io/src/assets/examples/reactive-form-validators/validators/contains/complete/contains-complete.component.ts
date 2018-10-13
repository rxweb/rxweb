import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-complete-validator',
    templateUrl: './contains-complete.component.html'
})
export class ContainsCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
										emailAddress:['',RxwebValidators.contains({value:'@gmail.com' })], 
													businessEmailAddress:['',RxwebValidators.contains({value:'@gmail.com'  ,conditionalExpression:(x,y) =>{ return  x.emailAddress == "abc@gmail.com" } })], 
													recoveryEmailAddress:['',RxwebValidators.contains({value:'@gmail.com'  ,conditionalExpression:x => x.emailAddress == "abc@gmail.com" })], 
													otherEmailAddress:['',RxwebValidators.contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' })], 
								});
    }
}
