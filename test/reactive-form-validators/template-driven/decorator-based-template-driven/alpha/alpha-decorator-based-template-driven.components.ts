import { Component,OnInit } from "@angular/core";

import {  alpha, } from    '../../../../../packages/reactive-form-validators';  

export class AddressInfo {

	@alpha() 
	countryName: string;

	//If you want to apply conditional expression of type 'function'
	@alpha({conditionalExpression:(x,y) => x.countryName == "India" }) 
	countryCode: string;

	//If you want to apply conditional expression of type 'string'
	@alpha({conditionalExpression:'x => x.countryName =="India"' }) 
	cityName: string;

	@alpha({allowWhiteSpace:true }) 
	stateName: string;

	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;

}


@Component({
    selector: 'app-alpha-decorator',
    template: `
    <form #addressinfoForm = "ngForm"  [rxwebForm]="addressinfoForm" [model]="addressinfo">
      <div class="form-group">
        <label>Country Name</label>
        <input type="text" name="countryName" [(ngModel)]="addressinfo.countryName"  class="form-control" />	
      </div>
      <div class="form-group">
        <label>City</label>
        <input type="text" name="cityName" [(ngModel)]="addressinfo.cityName"  class="form-control" />	
      </div>
      <div class="form-group">
        <label>State Name</label>
        <input type="text" name="stateName" [(ngModel)]="addressinfo.stateName"  class="form-control" />
      </div>
      <div class="form-group">
        <label>State Code</label>
        <input type="text" name="stateCode" [(ngModel)]="addressinfo.stateCode"  class="form-control" />	
      </div>
      <button [disabled]="!addressinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
  
    `
  })
  export class AlphaValidationComponent {
    addressinfo: AddressInfo = new AddressInfo();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.countryName ==\'India\'' }
  }

  
