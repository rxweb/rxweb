import { Component } from "@angular/core";


export class User {

	userName: string;

	allocationDate: Date;

	birthDate: Date;

	admissionDate: Date;

	registrationDate: Date;

	enrollmentDate: Date;

	lastRegistrationDate: Date;

}

@Component({
    selector: 'app-minDate',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>User Name</label>
          <input type="text" name="userName" [(ngModel)]="user.userName"  class="form-control" />

      </div>
      <div class="form-group">
        <label>Allocation Date</label>
          <input type="text" name="allocationDate" [(ngModel)]="user.allocationDate"  class="form-control" [rxminDate]="{'value':'07/30/2018'}"/>
      </div>
      <div class="form-group">
        <label>Admission Date</label>
          <input type="text" name="admissionDate" [(ngModel)]="user.admissionDate"  class="form-control" [rxminDate]="minDate"/>

      </div>
      <div class="form-group">
        <label>Registration Date</label>
          <input type="text" name="registrationDate" [(ngModel)]="user.registrationDate"  class="form-control" [rxminDate]="{'value':'07/30/2018','message':'Registration Date exceeds the Minimum Date Limit'}"/>
  
      </div>
      <div class="form-group">
        <label>Enrollment Date</label>
          <input type="text" name="enrollmentDate" [(ngModel)]="user.enrollmentDate"  class="form-control" />
  
      </div>
      <div class="form-group">
        <label>Last Registration Date</label>
          <input type="text" name="lastRegistrationDate" [(ngModel)]="user.lastRegistrationDate"  class="form-control" [rxminDate]="{'fieldName':'enrollmentDate'}"/>
  
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
  
   `
  })
  export class MinDateValidationComponent {
    user: User = new User();
    minDate = {'value':'07/30/2018','conditionalExpression':'x => x.userName == \'Bharat\''}
  }