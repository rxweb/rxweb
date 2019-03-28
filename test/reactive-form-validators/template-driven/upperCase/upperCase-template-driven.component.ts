import { Component } from "@angular/core";

export class Location {

	countryName: string;

	cityName: string;

	colonyName: string;

}
@Component({
    selector: 'app-url',
    template: `
    <form #locationForm = "ngForm">
    <div class="form-group">
      <label>Country Name</label>
	    <input type="text" name="countryName" [(ngModel)]="location.countryName"  class="form-control" upperCase/>

    </div>
    <div class="form-group">
      <label>City Name</label>
	    <input type="text" name="cityName" [(ngModel)]="location.cityName"  class="form-control" [upperCase]="conditionalExpression"/>

    </div>
    <div class="form-group">
      <label>Colony Name</label>
	    <input type="text" name="colonyName" [(ngModel)]="location.colonyName"  class="form-control" [upperCase]="{'message':'You can enter only upperCase letters.'}"/>

    </div>
    <button [disabled]="!locationForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class UpperCaseValidationComponent {
      
    location: Location = new Location();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.countryName ==\'INDIA\'' }
    message :{[key:string]:string} = { 'message':'You can enter only upperCase letters.' }
  }