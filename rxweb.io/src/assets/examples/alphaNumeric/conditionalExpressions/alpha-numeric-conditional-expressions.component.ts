import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-alphanumeric-conditionalExpressions',
    templateUrl: './alpha-numeric-conditional-expressions.component.html'
})
export class AlphaNumericConditionalExpressionsComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        this.locationFormGroup = this.formBuilder.formGroup(location);
    }
}
