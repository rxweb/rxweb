import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from "@rxweb/reactive-form-validators"
import {User} from "./model/user.model";
import { FormBuilderConfiguration, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { ApplicationBroadcaster } from "@rx/core";
import { AuthService } from 'src/app/domain/auth.service';
@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userFormGroup: FormGroup;
  userForm:FormGroup;
  userInfoFormGroup:FormGroup;
  userModelFormGroup: FormGroup
  user:User;
  codeContent:any;
  showComponent:boolean = false;
  comparePasswordTab:string = "component";
  conditionalValidationRequiredTab:string = "component";
  decoratorbasedModelValidationTab:string = "component";
  dynamicValidationTab:string = "component";
  isLoggedIn:boolean = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private rxFormBuilder:RxFormBuilder,private applicationBroadcast:ApplicationBroadcaster,private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = false;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true;
    }
    this.applicationBroadcast.urlBroadCast(true);
    this.userFormGroup = this.formBuilder.group({
      password: ['',],
      confirmPassword: ['', RxwebValidators.compare({ fieldName: 'password' })],
    });
    this.userForm = this.formBuilder.group({
      country:[''],
      identityNumber:['',RxwebValidators.required({conditionalExpression:(x) => x.country == 'India' })]
    });
    this.user = new User();
    this.userInfoFormGroup = this.rxFormBuilder.formGroup(this.user);
    this.http.get('assets/json/home.json').subscribe((response:object) => {
        this.codeContent = response;
    this.http.get('assets/json/dynamic-validation.json').subscribe((dynamicValidationConfiguration:any) => {
      
        this.userModelFormGroup = this.rxFormBuilder.group({
          firstName:['Bharat']
        },
        new FormBuilderConfiguration( { dynamicValidation: dynamicValidationConfiguration }));
        this.showComponent= true;
      });
    })
  }

  login():void{
    this.auth.login();
  }

}
