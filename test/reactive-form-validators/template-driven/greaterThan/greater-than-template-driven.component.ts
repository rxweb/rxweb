import { Component,OnInit } from "@angular/core";


export class User {

	admissionAge: number;

	retiermentAge: number;

	voterAge: number;

	memberAge: number;

	otherAge: number;

}
@Component({
    selector: 'app-greater-than',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Age</label>
          <input type="text" name="age" [(ngModel)]="user.age"  class="form-control" />	
      </div>
      <div class="form-group">
        <label>Retirement Age</label>
          <input type="text" name="retiermentAge" [(ngModel)]="user.retiermentAge"  class="form-control" [greaterThan]="{'fieldName':'age'}"/>	
      </div>
      <div class="form-group">
        <label>Voter Age</label>
          <input type="text" name="voterAge" [(ngModel)]="user.voterAge"  class="form-control" [greaterThan]="GreaterThanconditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Other Age</label>
          <input type="text" name="otherAge" [(ngModel)]="user.otherAge"  class="form-control" [greaterThan]="{'fieldName':'age','message':'Please enter number greater than 0.'}"/>
  
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>   
    `
  })

  export class GreaterThanValidationComponent {
    user: User = new User();
    GreaterThanconditionalExpression = {'fieldName':'age','conditionalExpression':'x => x.age > 17'}
  }
