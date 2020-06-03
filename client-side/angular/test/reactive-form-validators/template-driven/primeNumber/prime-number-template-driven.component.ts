import { Component } from "@angular/core";




export class NumberInfo {

	numberType: string;

	secondNumber: string;

	thirdNumber: string;

	firstNumber: string;

}


@Component({
    selector: 'app-primeNumber',
    template: `
  <form #numberinfoForm = "ngForm" [rxwebForm]="numberinfoForm">
    <div class="form-group">
      <label>Number Type</label>
	    <input type="text" name="numberType" [(ngModel)]="numberinfo.numberType"  class="form-control" />
    </div>
    <div class="form-group">
      <label>Third Number</label>
	    <input type="text" name="thirdNumber" [(ngModel)]="numberinfo.thirdNumber"  class="form-control" [rxprimeNumber]="conditionalExpression"/>
    </div>
    <div class="form-group">
      <label>First Number</label>
	    <input type="text" name="firstNumber" [(ngModel)]="numberinfo.firstNumber"  class="form-control" [rxprimeNumber]="{'message':'First Number is not a prime number'}"/>

    </div>
    <button [disabled]="!numberinfoForm.valid" class="btn btn-primary">Submit</button>
  </form>
   `
  })
  export class PrimeNumberValidationComponent {
    numberinfo: NumberInfo = new NumberInfo();
    conditionalExpression: { [key: string]: string } =  {'conditionalExpression':'x => x.numberType ==\'Prime\''} 
  }