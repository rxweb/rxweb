import { Component } from "@angular/core";

export class User {

	type: string;

	number: number;

	evenNumber: number;

	multiplesOfEvenNumber: number;

}
@Component({
    selector: 'app-even',
    template: `
  <form #userForm = "ngForm" [rxwebForm]="userForm">
    <div class="form-group">
      <label>Type</label>
	    <input type="text" name="type" [(ngModel)]="user.type"  class="form-control" />
    </div>
    <div class="form-group">
      <label>Even Number</label>
	    <input type="text" name="evenNumber" [(ngModel)]="user.evenNumber"  class="form-control" [rxeven]="conditionalExpression"/>
    </div>
    <div class="form-group">
      <label>Multiples of Even Number</label>
	    <input type="text" name="multiplesOfEvenNumber" [(ngModel)]="user.multiplesOfEvenNumber"  class="form-control" [rxeven]="{'message':'Multiples of Even Number is not an even number'}"/>
    </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })

  export class EvenValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.type == \'Even\'' }
  }