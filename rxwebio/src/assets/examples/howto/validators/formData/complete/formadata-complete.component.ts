import { Component, OnInit } from '@angular/core';
import { RxwebValidators,RxFormGroup,RxFormBuilder } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-formadata-complete-validator',
    templateUrl: './formadata-complete.component.html'
})
export class FormadataCompleteValidatorComponent implements OnInit {
    userFormGroup: RxFormGroup
     api:string = 'api/User'
	constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient )
	{ }

    ngOnInit() {       
        this.userFormGroup = <RxFormGroup>this.formBuilder.group({
            firstName:[''], 
            lastName :[''],
            userName:[''],
            password : ['']
        });     

    }
     addUser(){
         let formdata = this.userFormGroup.toFormData()
       this.http.post(this.api, formdata); // This is fake uri, This is just for your reference.
      }
}
