import { Component, OnInit } from '@angular/core';
import { RxwebValidators,RxFormGroup,RxFormBuilder ,FormGroupExtension} from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import {User} from './user.model'

@Component({
    selector: 'app-reset-complete',
    templateUrl: './reset-complete.component.html'
})
export class ResetCompleteComponent implements OnInit {
    userFormGroup: RxFormGroup
    
	constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient )
	{ }

    ngOnInit() {
       let user = new User();       
        this.userFormGroup = <RxFormGroup>this.formBuilder.formGroup(user);     
    }
    
     resetForm(){
        this.userFormGroup.resetForm();
       
      }
}
