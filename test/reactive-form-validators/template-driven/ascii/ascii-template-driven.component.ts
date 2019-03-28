import { Component } from "@angular/core";


export class User {

	language: string;

	numberAsciiCode: string;

	alphabetAsciiCode: string;

	specialCharAsciiCode: string;

}
@Component({
    selector: 'app-ascii',
    template: `
  <form #userForm = "ngForm" [rxwebForm]="userForm">
    <div class="form-group">
      <label>Language</label>
	    <input type="text" name="language" [(ngModel)]="user.language"  class="form-control" />
    </div>
    <div class="form-group">
      <label>Alphabet Ascii Code</label>
	    <input type="text" name="alphabetAsciiCode" [(ngModel)]="user.alphabetAsciiCode"  class="form-control" [ascii]="conditionalExpression"/>
    </div>
    <div class="form-group">
      <label>Special Character Ascii Code</label>
	    <input type="text" name="specialCharAsciiCode" [(ngModel)]="user.specialCharAsciiCode"  class="form-control" [ascii]="message"/>
    </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class AsciiValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.language ==\'Java\'' }
    message :{[key:string]:string} = { 'message':'Special Character Ascii Code is not an Ascii Code' }
  }