import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-message',
    templateUrl: './mac-message.component.html'
})
export class MacMessageComponent implements OnInit {

    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo);
    }
}
