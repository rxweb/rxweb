import { Component } from "@angular/core";


export class UserInfo {

	dataType: string;

	negativeNumber: number;

	decimalNumber: number;

	integerNumber: number;

	realNumber: number;

	positiveNumber: number;

}
@Component({
    selector: 'app-numeric',
    template: `
  <form #userinfoForm = "ngForm" [rxwebForm]="userinfoForm">
    <div class="form-group">
      <label>Data Type</label>
      <select name="dataType" [(ngModel)]="userinfo.dataType"  class="form-control"  >
		<option [value]="item" *ngFor="let item of dataTypes">{{item}}</option>
      </select>	
    </div>
    <div class="form-group">
      <label>Negative Number</label>
	    <input type="text" name="negativeNumber" [(ngModel)]="userinfo.negativeNumber"  class="form-control" [rxnumeric]="{'acceptValue':2}"/>
    </div>
    <div class="form-group">
      <label>Decimal Number</label>
	    <input type="text" name="decimalNumber" [(ngModel)]="userinfo.decimalNumber"  class="form-control" [rxnumeric]="{'allowDecimal':true}"/>
    </div>
    <div class="form-group">
      <label>Real Number</label>
	    <input type="text" name="realNumber" [(ngModel)]="userinfo.realNumber"  class="form-control" [rxnumeric]="numeric"/>
    </div>
    <div class="form-group">
      <label>Positive Number</label>
	    <input type="text" name="positiveNumber" [(ngModel)]="userinfo.positiveNumber"  class="form-control" [rxnumeric]="{'message':'Positive Number is not a positive number'}"/>

    </div>
    <button [disabled]="!userinfoForm.valid" class="btn btn-primary">Submit</button>
  </form>
   `
  })
  export class NumericValidationComponent {
    userinfo: UserInfo = new UserInfo();
    numeric = {'acceptValue':3,'conditionalExpression':'x => x.dataType == \'Real\''}
  }