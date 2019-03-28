import { Component } from "@angular/core";


export class User {

	firstNumber: number;

	fifthNumber: number;

	secondNumber: number;

	thirdNumber: number;

	fourthNumber: number;

	sixthNumber: number;

}
@Component({
    selector: 'app-factor',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>First Number</label>
          <input type="text" name="firstNumber" [(ngModel)]="user.firstNumber"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Fifth Number</label>
          <input type="text" name="fifthNumber" [(ngModel)]="user.fifthNumber"  class="form-control" [factor]="{'fieldName':'firstNumber'}"/>	
      </div>
      <div class="form-group">
        <label>Third Number</label>
          <input type="text" name="thirdNumber" [(ngModel)]="user.thirdNumber"  class="form-control" [factor]="FactorconditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Fourth Number</label>
          <input type="text" name="fourthNumber" [(ngModel)]="user.fourthNumber"  class="form-control" [factor]="{'dividend':50}"/>
      </div>
      <div class="form-group">
        <label>Sixth Number</label>
          <input type="text" name="sixthNumber" [(ngModel)]="user.sixthNumber"  class="form-control" [factor]="FactorMessage"/>
  
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })

  export class FactorValidationComponent {
    user: User = new User();
    FactorconditionalExpression = { 'fieldName':'firstNumber','conditionalExpression':'x => x.firstNumber == 25' }
    FactorMessage = {'dividend':30,'message':'Sixth Number is not a factor of 50'}
  }