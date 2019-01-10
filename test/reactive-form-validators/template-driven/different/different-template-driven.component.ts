import { Component,OnInit } from "@angular/core";


export class AccountInfo {

	firstName: string;

	lastName: string;

	middleName: string;

}
@Component({
    selector: 'app-different',
    template: `
    <form #accountinfoForm = "ngForm" [rxwebForm]="accountinfoForm">
      <div class="form-group">
        <label>First Name</label>
          <input type="text" name="firstName" [(ngModel)]="accountinfo.firstName"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Last Name</label>
          <input type="text" name="lastName" [(ngModel)]="accountinfo.lastName"  class="form-control" [different]="{'fieldName':'firstName'}"/>
      </div>
      <div class="form-group">
        <label>Middle Name</label>
          <input type="text" name="middleName" [(ngModel)]="accountinfo.middleName"  class="form-control" [different]="different"/>
      </div>
      <button [disabled]="!accountinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class DifferentValidationComponent {
    accountinfo: AccountInfo = new AccountInfo();
   different= {'fieldName':'firstName','message':'Middle Name is same as firstName'}
  }