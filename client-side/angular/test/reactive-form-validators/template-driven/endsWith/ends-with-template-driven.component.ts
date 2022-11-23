import { Component } from "@angular/core";


export class User {

	name: string;

	profession: string;

	taskId: string;

	company: string;

}
@Component({
    selector: 'app-ends-with',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Name</label>
          <input type="text" name="name" [(ngModel)]="user.name"  class="form-control" [rxendsWith]="{'value':'t'}"/>
      </div>
      <div class="form-group">
        <label>Task Id</label>
          <input type="text" name="taskId" [(ngModel)]="user.taskId"  class="form-control" [rxendsWith]="endsWithConditionalexpression"/>
      </div>
      <div class="form-group">
        <label>Company</label>
          <input type="text" name="company" [(ngModel)]="user.company"  class="form-control" [rxendsWith]="endsWithMessage"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>  
    `
  })

  export class EnsWithValidationComponent {
    user: User = new User();
    endsWithConditionalexpression = { 'value':'1','conditionalExpression':'x => x.name ==\'Bharat\'' }
    endsWithMessage = {'value':'b','message':'Company does not ends with b'}
  }