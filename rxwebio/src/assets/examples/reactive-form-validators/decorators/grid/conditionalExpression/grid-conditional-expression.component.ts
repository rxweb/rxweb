import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { DigitalInfo } from './digital-info.model';

@Component({
    selector: 'app-grid-conditionalExpression',
    templateUrl: './grid-conditional-expression.component.html'
})
export class GridConditionalExpressionComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let digitalInfo = new DigitalInfo();
        this.digitalInfoFormGroup = this.formBuilder.formGroup(digitalInfo);
    }
}
