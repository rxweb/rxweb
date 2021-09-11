import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreComponent, middleware } from '@rxweb/angular-router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoggedInMiddleware } from 'src/app/domain/security/middlewares/loggin.middleware';
import { BrowserStorage } from 'src/app/domain/services/browser-storage';
import { UserCredentialModel } from './login.model';
import { LoginService } from './login.service';

@middleware([LoggedInMiddleware])
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends CoreComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private formBuilder: RxFormBuilder, private router: Router, private storageHelper: BrowserStorage) { 
    super()
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.formGroup(UserCredentialModel);
  }

  OnSubmit() {
    this.get({path:'assets/json/users.json'}).subscribe(response =>{
      console.log(response);
    }
    )
    this.storageHelper.local.save('auth', 'response_token', false);
    this.storageHelper.local.save('key', 'response_key', false);
    this.router.navigate(['/dashboard']);
  }

}
