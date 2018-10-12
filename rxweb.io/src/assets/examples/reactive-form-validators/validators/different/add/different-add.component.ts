import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-add-validator',
    templateUrl: './different-add.component.html'
})
export class DifferentAddValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
										firstName:['',], 
													lastName:['', RxwebValidators.different({fieldName:"firstName" })], 
								});
    }
}
