import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-uppercase-conditionalExpressions',
    templateUrl: './upper-case-conditional-expressions.component.html'
})
export class UpperCaseConditionalExpressionsComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        this.locationFormGroup = this.formBuilder.formGroup(location);
    }
}
