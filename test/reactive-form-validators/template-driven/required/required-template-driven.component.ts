import { Component } from "@angular/core";


export class User {

	firstName: string;

	middleName: string;

	lastName: string;

	userName: string;

}
@Component({
    selector: 'app-required',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>First Name</label>
          <input type="text" name="firstName" [(ngModel)]="user.firstName"  class="form-control" required/>

      </div>
      <div class="form-group">
        <label>Last Name</label>
          <input type="text" name="lastName" [(ngModel)]="user.lastName"  class="form-control" [required]="conditionalExpression"/>
  
      </div>
      <div class="form-group">
        <label>UserName</label>
          <input type="text" name="userName" [(ngModel)]="user.userName"  class="form-control" [required]="{'message':'Username cannot be blank.'}"/>

      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>  
   `
  })
  export class RequiredValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.firstName == \'Bharat\'' }
  }

