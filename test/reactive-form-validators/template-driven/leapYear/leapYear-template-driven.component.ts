import { Component } from "@angular/core";


export class User {

	name: string;

	birthYear: number;

	admissionYear: Date;

	joiningYear: number;

}
@Component({
    selector: 'app-leapYear',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Name</label>
          <input type="text" name="name" [(ngModel)]="user.name"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Admission Year</label>
          <input type="text" name="admissionYear" [(ngModel)]="user.admissionYear"  class="form-control" [rxleapYear]="conditionalExpression"/>

      </div>
      <div class="form-group">
       <label>Joining Year</label>
          <input type="text" name="joiningYear" [(ngModel)]="user.joiningYear"  class="form-control" [rxleapYear]="{'message':'Joining Year is not a leap year'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LeapYearValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.name == \'Bharat\''}
  }