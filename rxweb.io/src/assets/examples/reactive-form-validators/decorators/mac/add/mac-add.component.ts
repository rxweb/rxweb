import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-add',
    templateUrl: './mac-add.component.html'
})
export class MacAddComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo);
    }
}
