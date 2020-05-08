import { Component } from "@angular/core";


export class User {

	firstName: string;

	middleName: string;

	lastName: string;

	userName: string;

}
@Component({
    selector: 'app-maxDate',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>First Name</label>
          <input type="text" name="firstName" [(ngModel)]="user.firstName"  class="form-control" [rxmaxLength]="{'value':16}"/>
      </div>
      <div class="form-group">
        <label>Last Name</label>
          <input type="text" name="lastName" [(ngModel)]="user.lastName"  class="form-control" [rxmaxLength]="maxLength"/>
      </div>
      <div class="form-group">
        <label>User Name</label>
          <input type="text" name="userName" [(ngModel)]="user.userName"  class="form-control" [rxmaxLength]="{'value':10,'message':'Maximum 10 characters are allowed'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class MaxLengthValidationComponent {
    user: User = new User();
    maxLength = {'value':16,'conditionalExpression':'x => x.firstName == \'Bharat\''}
  }