import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { user } from '../user.model';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class userEditComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/user-data.json').subscribe(user => {
            this.userFormGroup = this.formBuilder.formGroup<user>(user,user);
        })
    }
}
