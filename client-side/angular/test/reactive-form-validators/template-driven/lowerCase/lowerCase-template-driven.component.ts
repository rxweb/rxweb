import { Component } from "@angular/core";


export class User {

	username: string;

	firstName: string;

	middleName: string;

	lastName: string;

}
@Component({
    selector: 'app-lowerCase',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Username</label>
          <input type="text" name="username" [(ngModel)]="user.username"  class="form-control" lowerCase/>
      </div>
      <div class="form-group">
        <label>Middle name</label>
          <input type="text" name="middleName" [(ngModel)]="user.middleName"  class="form-control" [rxlowerCase]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Last name</label>
          <input type="text" name="lastName" [(ngModel)]="user.lastName"  class="form-control" [rxlowerCase]="{'message':'You can enter only lowerCase letters.'}"/>      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LowerCaseValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.username == \'jonathan.feldman\''} 
  }