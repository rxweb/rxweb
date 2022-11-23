import { Component } from "@angular/core";

export class Country {

	continent: string;

	secondCountryLongitude: string;

	thirdCountryLongitude: string;

	firstCountryLongitude: string;

}
@Component({
    selector: 'app-longitude',
    template: `
    <form #countryForm = "ngForm" [rxwebForm]="countryForm">
      <div class="form-group">
        <label> Continent</label>
          <input type="text" name="continent" [(ngModel)]="country.continent"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Third Country Longitude</label>
          <input type="text" name="thirdCountryLongitude" [(ngModel)]="country.thirdCountryLongitude"  class="form-control" [rxlongitude]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>First Country Longitude</label>
          <input type="text" name="firstCountryLongitude" [(ngModel)]="country.firstCountryLongitude"  class="form-control" [rxlongitude]="{'message':'First Country Longitude is not a longitude'}"/>
      </div>
      <button [disabled]="!countryForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LongitudeValidationComponent {
    country: Country = new Country();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.continent ==\'Asia\''} 
  }