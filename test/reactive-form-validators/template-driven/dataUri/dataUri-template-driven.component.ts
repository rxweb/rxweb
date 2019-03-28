import { Component } from "@angular/core";


export class User {

	scheme: string;

	imageDataUri: string;

	audioDataUri: string;

	videoDataUri: string;

}

@Component({
    selector: 'app-data-uri',
    template: `
    <form #userForm = "ngForm">
      <div class="form-group">
        <label>Scheme</label>
          <input type="text" name="scheme" [(ngModel)]="user.scheme"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Audio Data Uri</label>
          <input type="text" name="audioDataUri" [(ngModel)]="user.audioDataUri"  class="form-control" [dataUri]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Video Data Uri</label>
          <input type="text" name="videoDataUri" [(ngModel)]="user.videoDataUri"  class="form-control" [dataUri]="{'message':'Video Data Uri is not a proper data URI'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class DataUriValidationComponent {
    user: User = new User();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression': 'x => x.scheme ==\'DataUri\'' }
  }
