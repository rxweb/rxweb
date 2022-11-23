import { Component } from "@angular/core";



export class User {

	browser: string;

	entertainmentWebsitePort: string;

	shoppingWebsitePort: string;

	educationalWebsitePort: string;

}

@Component({
    selector: 'app-port',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Browser</label>
          <input type="text" name="browser" [(ngModel)]="user.browser"  class="form-control" />

      </div>
      <div class="form-group">
        <label>Shopping Website Port</label>
          <input type="text" name="shoppingWebsitePort" [(ngModel)]="user.shoppingWebsitePort"  class="form-control" [rxport]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Educational Website Port</label>
          <input type="text" name="educationalWebsitePort" [(ngModel)]="user.educationalWebsitePort"  class="form-control" [rxport]="{'message':'Educational Website Port is not a proper port number'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class PortValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } =  {'conditionalExpression':'x => x.browser ==\'Chrome\''} 
  }