import { Component } from "@angular/core";


export class Country {

	continent: string;

	secondCountry: string;

	thirdCountry: string;

	firstCountry: string;

}
@Component({
    selector: 'app-latLong',
    template: `
    <form #countryForm = "ngForm" [rxwebForm]="countryForm">
      <div class="form-group">
        <label>Continent</label>
          <input type="text" name="continent" [(ngModel)]="country.continent"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Third Country</label>
          <input type="text" name="thirdCountry" [(ngModel)]="country.thirdCountry"  class="form-control" [rxlatLong]="conditionalExpression"/>

      </div>
      <div class="form-group">
        <label>First Country</label>
          <input type="text" name="firstCountry" [(ngModel)]="country.firstCountry"  class="form-control" [rxlatLong]="{'message':'First Country is not a proper proper Latitude or Longitude'}"/>

      </div>
      <button [disabled]="!countryForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LatLongValidationComponent {
    country: Country = new Country();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.continent ==\'Asia\''} 
  }