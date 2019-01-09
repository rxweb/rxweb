import { Component,OnInit } from "@angular/core";


export class User {

	age: number;

	phoneNumber: number;

	faxNumber: number;

	mobileNumber: number;

}
@Component({
    selector: 'app-digit',
    template: `
    <form #userForm = "ngForm"  [rxwebForm]="userForm">
      <div class="form-group">
        <label>Age</label>
          <input type="text" name="age" [(ngModel)]="user.age"  class="form-control" digit/>

      </div>
      <div class="form-group">
        <label>Fax Number</label>
          <input type="text" name="faxNumber" [(ngModel)]="user.faxNumber"  class="form-control" [digit]="conditionalExpression"/>

      </div>
      <div class="form-group">
        <label>Mobile Number</label>
          <input type="text" name="mobileNumber" [(ngModel)]="user.mobileNumber"  class="form-control" [digit]="{'message':'Please enter only digit.'}"/>

      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class DigitValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.age >=25' }
  }