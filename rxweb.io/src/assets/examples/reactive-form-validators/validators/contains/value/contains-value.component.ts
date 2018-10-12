import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-value-validator',
    templateUrl: './contains-value.component.html'
})
export class ContainsValueValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										otherEmailAddress:['', RxwebValidators.contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' })], 
								});
    }
}
