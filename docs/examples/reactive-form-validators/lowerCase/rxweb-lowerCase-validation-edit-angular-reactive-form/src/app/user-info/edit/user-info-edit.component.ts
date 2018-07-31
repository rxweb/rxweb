import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from '../user-info.model';

@Component({
    selector: 'app-user-info-edit',
    templateUrl: './user-info-edit.component.html'
})
export class UserInfoEditComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/user-info-data.json').subscribe(userInfo => {
            this.userInfoFormGroup = this.formBuilder.formGroup<UserInfo>(UserInfo,userInfo);
        })
    }
}
