import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ip-message-validator',
    templateUrl: './ip-message.component.html'
})
export class IpMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            ipV4Message:['', RxwebValidators.ip({version:1  ,message:'Please Enter IP V4 type Only' })], 
        });
    }
}
