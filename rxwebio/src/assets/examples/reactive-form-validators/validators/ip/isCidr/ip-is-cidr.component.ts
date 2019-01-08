import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ip-isCidr-validator',
    templateUrl: './ip-is-cidr.component.html'
})
export class IpIsCidrValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            ipV4Cidr:['', RxwebValidators.ip({version:1  ,isCidr:true })], 
        });
    }
}
