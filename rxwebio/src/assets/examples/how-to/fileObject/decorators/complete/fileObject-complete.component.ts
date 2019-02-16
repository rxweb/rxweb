import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators,RxFormGroup,RxFormBuilder } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
@Component({
    selector: 'app-fileObject-validator',
    templateUrl: './fileObject-complete.component.html'
})
export class FileObjectCompleteComponent implements OnInit {
    userInfoFormGroup: RxFormGroup
   api:string = 'api/User'
	constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient  )
	{ }

    ngOnInit() {
        let user = new User();
        this.userInfoFormGroup = <RxFormGroup>this.formBuilder.formGroup(user);
    }
      addUser(){
         let formdata = this.userInfoFormGroup.toFormData()
       this.http.post(this.api, formdata); // This is fake uri, This is just for your reference.      
      }
}
