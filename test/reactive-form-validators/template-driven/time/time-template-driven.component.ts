import { Component } from "@angular/core";




export class AttandanceDetail {

	entryPlace: string;

	totalIn: string;

	entryTime: string;

	totalOutTime: string;

	exitTime: string;

}

@Component({
    selector: 'app-time',
    template: `
    <form #attandancedetailForm = "ngForm" [rxwebForm]="attandancedetailForm">
      <div class="form-group">
        <label>Entry Place</label>
          <input type="text" name="entryPlace" [(ngModel)]="attandancedetail.entryPlace"  class="form-control" />

      </div>
      <div class="form-group">
        <label>Entry Time</label>
          <input type="text" name="entryTime" [(ngModel)]="attandancedetail.entryTime"  class="form-control" [time]="conditionalExpression"/>

      </div>
      <div class="form-group">
        <label>Total Time Out</label>
          <input type="text" name="totalOutTime" [(ngModel)]="attandancedetail.totalOutTime"  class="form-control" [time]="{'allowSeconds':true}"/>
  
      </div>
      <div class="form-group">
        <label>Exit Time</label>
          <input type="text" name="exitTime" [(ngModel)]="attandancedetail.exitTime"  class="form-control" [time]="{'message':'You can enter only time format data'}"/>
  
      </div>
      <button [disabled]="!attandancedetailForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class TimeValidationComponent {
    attandancedetail: AttandanceDetail = new AttandanceDetail();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.entryPlace == \'Lunch Room\'' }
  }

