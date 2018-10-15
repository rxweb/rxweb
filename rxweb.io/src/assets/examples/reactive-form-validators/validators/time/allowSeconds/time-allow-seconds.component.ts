import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-allowSeconds-validator',
    templateUrl: './time-allow-seconds.component.html'
})
export class TimeAllowSecondsValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.group({
										totalOutTime:['', RxwebValidators.time({allowSeconds:true })], 
								});
    }
}
