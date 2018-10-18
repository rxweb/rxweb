import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-message-validator',
    templateUrl: './port-message.component.html'
})
export class PortMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										educationalWebsitePort:['', RxwebValidators.port({message:'{{0}} is not a proper port number' })], 
								});
    }
}
