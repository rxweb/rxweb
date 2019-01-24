import { Component,OnInit } from "@angular/core";


export class User {

	emailAddress: string;

	businessEmailAddress: string;

	recoveryEmailAddress: string;

	otherEmailAddress: string;

}
@Component({
    selector: 'app-contains',
    template: `
  <form #userForm = "ngForm"  [rxwebForm]="userForm">
    <div class="form-group">
      <label>Email Address</label>
	    <input type="text" name="emailAddress" [(ngModel)]="user.emailAddress"  class="form-control" [contains]="value"/>
    </div>
    <div class="form-group">
      <label>Recovery Email Address</label>
	    <input type="text" name="recoveryEmailAddress" [(ngModel)]="user.recoveryEmailAddress"  class="form-control" [contains]="contains"/>
    </div>
    <div class="form-group">
      <label>Other Email Address</label>
	    <input type="text" name="otherEmailAddress" [(ngModel)]="user.otherEmailAddress"  class="form-control" [contains]="containsMessage"/>

    </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class ContainsValidationComponent {
    user: User = new User();
    contains={'value':'@gmail.com','conditionalExpression':'x => x.emailAddress == \'abc@gmail.com\''}
    containsMessage={'value':'@gmail.com','message':'Please enter valid gmailId'}
    value :{[key:string]:string} = { 'value':'@gmail.com' }
  }
