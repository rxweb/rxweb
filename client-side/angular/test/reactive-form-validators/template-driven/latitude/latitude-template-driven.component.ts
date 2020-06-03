import { Component } from "@angular/core";


export class Country {

	continent: string;

	secondCountryLatitude: string;

	thirdCountryLatitude: string;

	firstCountryLatitude: string;

}
@Component({
    selector: 'app-latitude',
    template: `
    <form #countryForm = "ngForm" [rxwebForm]="countryForm">
      <div class="form-group">
        <label> Continent</label>
          <input type="text" name="continent" [(ngModel)]="country.continent"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Third Country Latitude</label>
          <input type="text" name="thirdCountryLatitude" [(ngModel)]="country.thirdCountryLatitude"  class="form-control" [rxlatitude]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>First Country Latitude</label>
          <input type="text" name="firstCountryLatitude" [(ngModel)]="country.firstCountryLatitude"  class="form-control" [rxlatitude]="{'message':'First Country Latitude is not a latitude'}"/>
      </div>
      <button [disabled]="!countryForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LatitudeValidationComponent {
    country: Country = new Country();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.continent ==\'Asia\''} 
  }