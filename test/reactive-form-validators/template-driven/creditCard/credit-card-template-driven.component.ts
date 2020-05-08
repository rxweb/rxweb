import { Component } from "@angular/core";



export class User {

	cardType: string;

	otherVisaCard: string;

}

@Component({
    selector: 'app-creditCard',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Card Type</label>
        <select name="cardType" [(ngModel)]="user.cardType"  class="form-control"  >
          <option [value]="item" *ngFor="let item of creditCardTypes">{{item}}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Other Visa Card</label>
          <input type="text" name="otherVisaCard" [(ngModel)]="user.otherVisaCard"  class="form-control" [rxcreditCard]="creditCard"/>
  
      </div>
    
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class CreditCardValidationComponent {
    user: User = new User();
    creditCard = {'fieldName':'cardType','conditionalExpression':'x => x.cardType == \'Visa\'','message':'Invalid Visa Credit Card Number.'}

  }
