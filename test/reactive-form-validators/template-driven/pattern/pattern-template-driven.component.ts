import { Component } from "@angular/core";


export class User {

	userName: string;

	zipCode: string;

	contactNumber: number;

	age: string;

}
@Component({
    selector: 'app-pattern',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>User Name</label>
          <input type="text" name="userName" [(ngModel)]="user.userName"  class="form-control" [pattern]="{'expression':'/^[A-Za-z]+$/'}"/>
      </div>
      <div class="form-group">
        <label>Zip Code</label>
          <input type="text" name="zipCode" [(ngModel)]="user.zipCode"  class="form-control" [pattern]="{'expression':'^[0-9]{5?:-[0-9]{4?$' ,'message':'Zip code should match 12345 or 12345-6789'}"/>
  
      </div>
      <div class="form-group">
        <label>Age</label>
          <input type="text" name="age" [(ngModel)]="user.age"  class="form-control" [pattern]="PatternconditionalExpression"/>

      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class PatternValidationComponent {
    user: User = new User();
    PatternconditionalExpression =  {'expression':'/^[0-9]*$new /','conditionalExpression':'x => x.userName==\'Bharat\''}
  }