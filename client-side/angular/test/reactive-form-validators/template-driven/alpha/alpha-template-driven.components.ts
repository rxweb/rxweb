import { Component } from "@angular/core";

export class AddressInfo {

	countryName: string;

	countryCode: string;

	cityName: string;

	stateName: string;

	stateCode: string;

}


@Component({
    selector: 'app-alpha',
    template: `
    <form #addressinfoForm = "ngForm"  [rxwebForm]="addressinfoForm">
      <div class="form-group">
        <label>Country Name</label>
        <input type="text" name="countryName" [(ngModel)]="addressinfo.countryName"  class="form-control" rxalpha/>	
      </div>
      <div class="form-group">
        <label>City</label>
        <input type="text" name="cityName" [(ngModel)]="addressinfo.cityName"  class="form-control" [rxalpha]="conditionalExpression"/>	
      </div>
      <div class="form-group">
        <label>State Name</label>
        <input type="text" name="stateName" [(ngModel)]="addressinfo.stateName"  class="form-control" [rxalpha]="{'allowWhiteSpace':true}"/>
      </div>
      <div class="form-group">
        <label>State Code</label>
        <input type="text" name="stateCode" [(ngModel)]="addressinfo.stateCode"  class="form-control" [rxalpha]="{'message':'You can enter only alphabets.'}"/>	
      </div>
      <button [disabled]="!addressinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
  
    `
  })
  export class AlphaValidationComponent {
    addressinfo: AddressInfo = new AddressInfo();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.countryName ==\'India\'' }
  }

  
