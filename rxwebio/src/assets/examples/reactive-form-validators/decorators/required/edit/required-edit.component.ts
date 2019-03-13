import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-required-edit',
    templateUrl: './required-edit.component.html'
})
export class RequiredEditComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/required/edit/user-info-data.json?v=' + environment.appVersion).subscribe(userInfo => {
            this.userInfoFormGroup = this.formBuilder.formGroup<UserInfo>(UserInfo,userInfo);
        })
    }
}
