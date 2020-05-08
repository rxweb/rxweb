import { Component } from "@angular/core";

export class User {

	obtainedMarks: number;

	otherActivityMarks: number;

	practicalExamMarks: number;

	passingMarks: number;

	otherMarks: number;

}
@Component({
    selector: 'app-less-Than',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
        <label>Obtained Marks</label>
          <input type="text" name="obtainedMarks" [(ngModel)]="user.obtainedMarks"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Other Activity Marks</label>
          <input type="text" name="otherActivityMarks" [(ngModel)]="user.otherActivityMarks"  class="form-control" [rxlessThan]="{'fieldName':'obtainedMarks'}"/>
      </div>
      <div class="form-group">
        <label>Passing Marks</label>
          <input type="text" name="passingMarks" [(ngModel)]="user.passingMarks"  class="form-control" [rxlessThan]="lessThanEqualTo"/>

      </div>
      <div class="form-group">
        <label>Other Marks</label>
          <input type="text" name="otherMarks" [(ngModel)]="user.otherMarks"  class="form-control" [rxlessThan]="{'fieldName':'obtainedMarks','message':'Please enter number greater than 100.'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LessThanValidationComponent {
    user: User = new User();
    lessThanEqualTo = {'fieldName':'obtainedMarks','conditionalExpression':'x => x.obtainedMarks < 35'}
  }
