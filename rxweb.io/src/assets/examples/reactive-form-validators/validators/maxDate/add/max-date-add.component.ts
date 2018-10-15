import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-add-validator',
    templateUrl: './max-date-add.component.html'
})
export class MaxDateAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										registrationDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30) })], 
								});
    }
}
