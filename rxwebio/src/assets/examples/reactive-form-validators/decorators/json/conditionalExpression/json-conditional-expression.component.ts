import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-conditionalExpression',
    templateUrl: './json-conditional-expression.component.html'
})
export class JsonConditionalExpressionComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let jsonInfo = new JsonInfo();
        this.jsonInfoFormGroup = this.formBuilder.formGroup(jsonInfo);
    }
}
