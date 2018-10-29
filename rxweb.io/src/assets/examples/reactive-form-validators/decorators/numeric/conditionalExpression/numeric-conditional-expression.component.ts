import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-conditionalExpression',
    templateUrl: './numeric-conditional-expression.component.html'
})
export class NumericConditionalExpressionComponent implements OnInit {
    userInfoFormGroup: FormGroup
				dataTypes = [ "Real", "Positive",];

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let userInfo = new UserInfo();
        this.userInfoFormGroup = this.formBuilder.formGroup(userInfo);
    }
}
