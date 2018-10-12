import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-odd-message-validator',
    templateUrl: './odd-message.component.html'
})
export class OddMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
										multiplesOfOddNumber:['',RxwebValidators.odd({message:'{{0}} is not an odd number' })], 
								});
    }
}
