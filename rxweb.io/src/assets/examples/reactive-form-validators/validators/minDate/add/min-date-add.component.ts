import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-add-validator',
    templateUrl: './min-date-add.component.html'
})
export class MinDateAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										registrationDate:['', RxwebValidators.minDate({value:new Date(2018,7,30) })], 
								});
    }
}
