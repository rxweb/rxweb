import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-message-validator',
    templateUrl: './port-message.component.html'
})
export class PortMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            educationalWebsitePort:['', RxwebValidators.port({message:'{{0}} is not a proper port number' })], 
        });
    }
}
