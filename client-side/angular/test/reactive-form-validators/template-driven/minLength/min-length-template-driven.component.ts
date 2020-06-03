import { Component } from "@angular/core";


export class Contact {

	countryName: string;

	mobileNo: string;

	landLineNo: string;

	countryCode: string;

	stateCode: string;

}

@Component({
    selector: 'app-minLength',
    template: `
  <form #contactForm = "ngForm" [rxwebForm]="contactForm">
    <div class="form-group">
      <label>Country Name</label>
	    <input type="text" name="countryName" [(ngModel)]="contact.countryName"  class="form-control" />
    </div>
    <div class="form-group">
      <label>Mobile No.</label>
	    <input type="text" name="mobileNo" [(ngModel)]="contact.mobileNo"  class="form-control" [rxminLength]="{'value':10}"/>
    </div>
    <div class="form-group">
      <label>Land line No</label>
	    <input type="text" name="landLineNo" [(ngModel)]="contact.landLineNo"  class="form-control" [rxminLength]="{'value':8,'message':'Minimum 8 characters are allowed'}"/>

    </div>
    <div class="form-group">
      <label>State Code</label>
	    <input type="text" name="stateCode" [(ngModel)]="contact.stateCode"  class="form-control" [rxminLength]="minLength"/>

    </div>
    <button [disabled]="!contactForm.valid" class="btn btn-primary">Submit</button>
  </form>
   `
  })
  export class MinLengthValidationComponent {
    contact: Contact = new Contact();
    minLength = {'value':3,'conditionalExpression':'x => x.countryName == \'India\''}
  }