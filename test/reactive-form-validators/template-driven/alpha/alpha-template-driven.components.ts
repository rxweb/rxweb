import { Component,OnInit } from "@angular/core";

export class Location {

    areaName: string;

	flatAddress: string;

	postalAddress: string;

	countryCode: string;

	cityCode: string;

}

@Component({
    selector: 'app-alpha',
    template: `
  <form #locationForm="ngForm">
    <div class="form-group">
      <label>Area Name</label>
	    <input type="text" name="areaName" [(ngModel)]="location.areaName"  class="form-control" alphaNumeric/>
    </div>
    <div class="form-group">
      <label>Flat Address</label>
	    <input type="text" name="flatAddress" [(ngModel)]="location.flatAddress"  class="form-control" [alphaNumeric]="{'allowWhiteSpace':true}"/>
    </div>
    <div class="form-group">
      <label>Postal Address</label>
	    <input type="text" name="postalAddress" [(ngModel)]="location.postalAddress"  class="form-control" [alphaNumeric]="{'message':'Please enter only alphanumerics, special characters are not allowed.'}"/>
    </div>
    <div class="form-group">
      <label>City Code</label>
	    <input type="text" name="cityCode" [(ngModel)]="location.cityCode"  class="form-control" [alphaNumeric]="conditionalExpression"/>
    </div>
    <button [disabled]="!locationForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class AlphaValidationComponent {
    location: Location = new Location();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.areaName ==\'Delhi\'' }
  }

  
