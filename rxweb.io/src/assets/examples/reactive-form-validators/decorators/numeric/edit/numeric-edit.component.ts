import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-edit',
    templateUrl: './numeric-edit.component.html'
})
export class NumericEditComponent implements OnInit {

    userInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/numeric/edit/user-info-data.json').subscribe(userInfo => {
            this.userInfoFormGroup = this.formBuilder.formGroup<UserInfo>(UserInfo,userInfo);
        })
    }
}
