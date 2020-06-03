import { Component } from "@angular/core";


export class SubjectDetails {

	subjectCode: string;

	maximumMarks: number;

	obtainedMarks: number;

	passingMarks: number;

	practicalMarks: number;

}
@Component({
    selector: 'app-maxNumber',
    template: `
    <form #subjectdetailsForm = "ngForm" [rxwebForm]="subjectdetailsForm">
      <div class="form-group">
        <label>Subject Code</label>
          <input type="text" name="subjectCode" [(ngModel)]="subjectdetails.subjectCode"  class="form-control" />

      </div>
      <div class="form-group">
        <label>Obtained Marks for above subject code</label>
          <input type="text" name="obtainedMarks" [(ngModel)]="subjectdetails.obtainedMarks"  class="form-control" [rxmaxNumber]="maxNumber"/>
      </div>
      <div class="form-group">
        <label>Passing Marks</label>
          <input type="text" name="passingMarks" [(ngModel)]="subjectdetails.passingMarks"  class="form-control" [rxmaxNumber]="{'value':50}"/>

      </div>
      <div class="form-group">
        <label>Practical Marks</label>
          <input type="text" name="practicalMarks" [(ngModel)]="subjectdetails.practicalMarks"  class="form-control" [rxmaxNumber]="{'value':70,'message':'Practical Marks exceeds the Maximum marks Limit'}"/>

      </div>
      <button [disabled]="!subjectdetailsForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class MaxNumberValidationComponent {
    subjectdetails: SubjectDetails = new SubjectDetails();
    maxNumber = {'value':100,'conditionalExpression':'x => x.subjectCode == \'8CS5A\''}
  }