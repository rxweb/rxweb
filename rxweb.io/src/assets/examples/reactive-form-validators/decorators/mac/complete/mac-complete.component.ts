import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-complete',
    templateUrl: './mac-complete.component.html'
})
export class MacCompleteComponent implements OnInit {

    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo);
    }
}
