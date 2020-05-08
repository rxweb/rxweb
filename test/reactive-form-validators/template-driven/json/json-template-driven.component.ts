import { Component } from "@angular/core";


export class JsonInfo {

	location: string;

	addressJson: string;

	locationJson: string;

	contactJson: string;

}

@Component({
    selector: 'app-json',
    template: `
  <form #jsoninfoForm = "ngForm" [rxwebForm]="jsoninfoForm">
    <div class="form-group">
      <label>Location</label>
	    <input type="text" name="location" [(ngModel)]="jsoninfo.location"  class="form-control" />
    </div>
    <div class="form-group">
      <label>Location Json</label>
	    <input type="text" name="locationJson" [(ngModel)]="jsoninfo.locationJson"  class="form-control" [rxjson]="json"/>
    </div>
    <div class="form-group">
      <label>Contact Json</label>
	    <input type="text" name="contactJson" [(ngModel)]="jsoninfo.contactJson"  class="form-control" [rxjson]="{'message':'Enter only JSON type data'}"/>
    </div>
    <button [disabled]="!jsoninfoForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class JsonValidationComponent {
    jsoninfo: JsonInfo = new JsonInfo();
    json = {'conditionalExpression':'x => x.location == \'{CountryName:India}\'','message':'Enter the text in JSON format --> {key:value}' }
  }