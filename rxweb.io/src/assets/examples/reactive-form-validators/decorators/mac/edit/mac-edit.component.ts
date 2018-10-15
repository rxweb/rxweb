import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-edit',
    templateUrl: './mac-edit.component.html'
})
export class MacEditComponent implements OnInit {

    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/mac/edit/mac-address-info-data.json').subscribe(macAddressInfo => {
            this.macAddressInfoFormGroup = this.formBuilder.formGroup<MacAddressInfo>(MacAddressInfo,macAddressInfo);
        })
    }
}
