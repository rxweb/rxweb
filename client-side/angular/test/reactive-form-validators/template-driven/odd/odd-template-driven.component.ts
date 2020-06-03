import { Component } from "@angular/core";


export class User {

	type: string;

	number: number;

	oddNumber: number;

	multiplesOfOddNumber: number;

}
@Component({
    selector: 'app-odd',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Type</label>
          <input type="text" name="type" [(ngModel)]="user.type"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Odd Number</label>
          <input type="text" name="oddNumber" [(ngModel)]="user.oddNumber"  class="form-control" [rxodd]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Multiples of Odd Number</label>
          <input type="text" name="multiplesOfOddNumber" [(ngModel)]="user.multiplesOfOddNumber"  class="form-control" [rxodd]="{'message':'Multiples of Odd Number is not an odd number'}"/>

      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>

   `
  })
  export class OddValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } =  {'conditionalExpression':'x => x.type == \'Odd\''} 
  }