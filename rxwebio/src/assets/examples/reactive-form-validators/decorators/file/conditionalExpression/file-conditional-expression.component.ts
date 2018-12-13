import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-file-conditionalExpression',
    templateUrl: './file-conditional-expression.component.html'
})
export class FileConditionalExpressionComponent implements OnInit {
    userInfoFormGroup: FormGroup
				fileTypes = [ "Picture", "Document",];

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let userInfo = new UserInfo();
        this.userInfoFormGroup = this.formBuilder.formGroup(userInfo);
    }
}
