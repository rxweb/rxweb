import { Component } from "@angular/core";

export class User {

	adminWebsiteUrl: string;

	customerWebsiteUrl: string;

	maintenanceWebSiteUrl: string;

}
@Component({
    selector: 'app-url',
    template: `
    <form #userForm = "ngForm">
    <div class="form-group">
      <label>Admin Website Url</label>
	    <input type="text" name="adminWebsiteUrl" [(ngModel)]="user.adminWebsiteUrl"  class="form-control" url/>

    </div>
    <div class="form-group">
      <label>Customer Website Url</label>
	    <input type="text" name="customerWebsiteUrl" [(ngModel)]="user.customerWebsiteUrl"  class="form-control" [url]="conditionalExpression"/>

    </div>
    <div class="form-group">
      <label>Maintenance Website Url</label>
	    <input type="text" name="maintenanceWebSiteUrl" [(ngModel)]="user.maintenanceWebSiteUrl"  class="form-control" [url]="{'message':'Maintenance Website Url Is not the correct url pattern.'}"/>

        </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
    `
  })
  export class UrlValidationComponent {
      
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.adminWebsiteUrl ==\'https:\/\/google.co.in\'' }
    message :{[key:string]:string} = { 'message':'Maintenance Website Url Is not the correct url pattern.' }
  }