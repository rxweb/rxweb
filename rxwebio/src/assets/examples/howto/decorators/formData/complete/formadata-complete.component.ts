import { Component, OnInit } from '@angular/core';
import { RxwebValidators,RxFormGroup,RxFormBuilder } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import {User} from './user.model'

@Component({
    selector: 'app-formadata-complete',
    templateUrl: './formadata-complete.component.html'
})
export class FormadataCompleteComponent implements OnInit {
    userFormGroup: RxFormGroup
     api:string = 'api/User'
	constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient )
	{ }

    ngOnInit() {
       let user = new User();       
        this.userFormGroup = <RxFormGroup>this.formBuilder.formGroup(user);     
    }
    
     addUser(){
         let formdata = this.userFormGroup.toFormData()
       this.http.post(this.api, formdata); // This is fake uri, This is just for your reference.
      }
}
