import { Component } from "@angular/core";


export class User {

	email: string;

	confirmEmail: string;

	password: string;

	confirmPassword: string;

}
@Component({
    selector: 'app-compare',
    template: `
    <form #userForm = "ngForm"  [rxwebForm]="userForm">
      <div class="form-group">
        <label>Email</label>
          <input type="text" name="email" [(ngModel)]="user.email"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Confirm Email</label>
          <input type="text" name="confirmEmail" [(ngModel)]="user.confirmEmail"  class="form-control" [rxcompare]="fieldNameEmail"/>
      </div>
      <div class="form-group">
        <label>Password</label>
          <input type="text" name="password" [(ngModel)]="user.password"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
          <input type="text" name="confirmPassword" [(ngModel)]="user.confirmPassword"  class="form-control" [rxcompare]="comparePassword"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class CompareValidationComponent {  
    user: User = new User();
    fieldNameEmail: { [key: string]: string } = { 'fieldName': 'email' }
    comparePassword  = { 'fieldName':'password','message':'You must enter same password'} 
    message :{[key:string]:string} = { 'message':'You must enter same password' }
  }
