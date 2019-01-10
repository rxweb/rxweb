import { Component } from "@angular/core";


export class User {

	admissionAge: number;

	retiermentAge: number;

	voterAge: number;

	memberAge: number;

	otherAge: number;

}
@Component({
    selector: 'app-greater-than-equal-to',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Admission Age</label>
          <input type="text" name="admissionAge" [(ngModel)]="user.admissionAge"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Retirement Age</label>
          <input type="text" name="retiermentAge" [(ngModel)]="user.retiermentAge"  class="form-control" [greaterThanEqualTo]="{'fieldName':'admissionAge'}"/>
      </div>
      <div class="form-group">
        <label>Member Age</label>
          <input type="text" name="memberAge" [(ngModel)]="user.memberAge"  class="form-control" [greaterThanEqualTo]="GreaterThanEqualToconditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Other Age</label>
          <input type="text" name="otherAge" [(ngModel)]="user.otherAge"  class="form-control" [greaterThanEqualTo]="{'fieldName':'admissionAge','message':'Please enter number greater than or equal to 1.'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })

  export class GreaterThanEqualToValidationComponent {
    user: User = new User();
    GreaterThanEqualToconditionalExpression = {'fieldName':'admissionAge','conditionalExpression':'x => x.admissionAge >= 18 '}
  }
