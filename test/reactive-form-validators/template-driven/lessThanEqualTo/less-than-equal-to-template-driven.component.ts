import { Component } from "@angular/core";



export class User {

	totalMarks: number;

	passingMarks: number;

	obtainedMarks: number;

	practicalExamMarks: number;

	otherMarks: number;

}

@Component({
    selector: 'app-less-than-equal-to',
    template: `
    <form #userForm = "ngForm" [rxwebForm]="userForm">
      <div class="form-group">
              <label>Total Marks</label>
          <input type="text" name="totalMarks" [(ngModel)]="user.totalMarks"  class="form-control" />
      </div>
      <div class="form-group">
        <label>Passing Marks</label>
          <input type="text" name="passingMarks" [(ngModel)]="user.passingMarks"  class="form-control" [lessThanEqualTo]="{'fieldName':'totalMarks'}"/>
      </div>
      <div class="form-group">
        <label>Practical Exam Marks</label>
          <input type="text" name="practicalExamMarks" [(ngModel)]="user.practicalExamMarks"  class="form-control" [lessThanEqualTo]="lessThanEqualTo"/>
	
      </div>
      <div class="form-group">
        <label>Other Marks</label>
          <input type="text" name="otherMarks" [(ngModel)]="user.otherMarks"  class="form-control" [lessThanEqualTo]="{'fieldName':'totalMarks','message':'Please enter number less than 100.'}"/>
      </div>
      <button [disabled]="!userForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class LessThanEqualToValidationComponent {
    user: User = new User();
    lessThanEqualTo = {'fieldName':'totalMarks','conditionalExpression':'x => x.totalMarks == 100'}
  }