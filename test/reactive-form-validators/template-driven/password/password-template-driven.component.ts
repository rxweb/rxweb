import { Component } from "@angular/core";


export class LoginInfo {

	newPassword: string;

	oldPassword: string;

}

@Component({
    selector: 'app-password',
    template: `
    <form #logininfoForm = "ngForm" [rxwebForm]="logininfoForm">
      <div class="form-group">
        <label>New Password</label>
          <input type="text" name="newPassword" [(ngModel)]="logininfo.newPassword"  class="form-control" [password]="{'validation':{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}}"/>

      </div>
      <div class="form-group">
        <label>Old Password</label>
          <input type="text" name="oldPassword" [(ngModel)]="logininfo.oldPassword"  class="form-control" [password]="{'validation':{maxLength: 10,minLength: 5,digit: true,specialCharacter: true},'message':'Password is not valid'}"/>

      </div>
      <button [disabled]="!logininfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class PasswordValidationComponent {
    logininfo: LoginInfo = new LoginInfo();

  }