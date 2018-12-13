import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-image-edit',
    templateUrl: './image-edit.component.html'
})
export class ImageEditComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/image/edit/user-info-data.json').subscribe(userInfo => {
            this.userInfoFormGroup = this.formBuilder.formGroup<UserInfo>(UserInfo,userInfo);
        })
    }
}
