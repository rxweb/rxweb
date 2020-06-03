import { Component } from "@angular/core";


export class User {

	email: string;

	recoveryEmailAddress: string;

	businessEmailAddress: string;

	otherEmailAddress: string;

}

@Component({
    selector: 'app-email',
    template: `
  <form #userForm = "ngForm" [rxwebForm]="userForm">
    <div class="form-group">
      <label>Email</label>
	    <input type="text" name="email" [(ngModel)]="user.email"  class="form-control" email/>
    </div>
    <div class="form-group">
      <label>Business Email Address</label>
	    <input type="text" name="businessEmailAddress" [(ngModel)]="user.businessEmailAddress"  class="form-control" [rxemail]="conditionalExpression"/>
    </div>
    <div class="form-group">
      <label>Other Email Address</label>
	    <input type="text" name="otherEmailAddress" [(ngModel)]="user.otherEmailAddress"  class="form-control" [rxemail]="{'message':'Please enter valid email'}"/>
    </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class EmailValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.email ==\'abc@gmail.com\'' }
  }