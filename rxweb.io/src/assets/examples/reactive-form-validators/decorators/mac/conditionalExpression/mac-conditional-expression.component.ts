import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-conditionalExpression',
    templateUrl: './mac-conditional-expression.component.html'
})
export class MacConditionalExpressionComponent implements OnInit {

    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo);
    }
}
