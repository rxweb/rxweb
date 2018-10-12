import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-message-validator',
    templateUrl: './time-message.component.html'
})
export class TimeMessageValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.formGroup({
										exitTime:['',RxwebValidators.time({message:'You can enter only time format data' })], 
								});
    }
}
