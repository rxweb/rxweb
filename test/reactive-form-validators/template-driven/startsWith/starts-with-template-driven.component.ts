import { Component } from "@angular/core";



export class User {

	name: string;

	profession: string;

	taskId: string;

	company: string;

}

@Component({
    selector: 'app-startsWith',
    template: `
  <form #userForm = "ngForm" [rxwebForm]="userForm">
    <div class="form-group">
      <label>Name</label>
	    <input type="text" name="name" [(ngModel)]="user.name"  class="form-control" [startsWith]="{'value':'B'}"/>
    </div>
    <div class="form-group">
      <label>Task Id</label>
	    <input type="text" name="taskId" [(ngModel)]="user.taskId"  class="form-control" [startsWith]="startsWith"/>
    </div>
    <div class="form-group">
      <label>Company</label>
	    <input type="text" name="company" [(ngModel)]="user.company"  class="form-control" [startsWith]="{'value':'R','message':'Company does not starts with R'}"/>

    </div>
    <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
  </form>
   `
  })
  export class StartsWithValidationComponent {
    user: User = new User();
    startsWith = {'value':'#','conditionalExpression':'x => x.name ==\'Bharat\''}
  }

