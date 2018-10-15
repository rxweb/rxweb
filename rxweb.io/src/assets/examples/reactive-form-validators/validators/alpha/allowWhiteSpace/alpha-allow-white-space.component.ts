import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-allowWhiteSpace-validator',
    templateUrl: './alpha-allow-white-space.component.html'
})
export class AlphaAllowWhiteSpaceValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
										stateName:['', RxwebValidators.alpha({allowWhiteSpace:true })], 
								});
    }
}
