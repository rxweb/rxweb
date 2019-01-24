import { Component } from "@angular/core";


export class ResultInfo {

	maths: number;

	science: number;

	english: number;

	statstics: number;

}
@Component({
    selector: 'app-minNumber',
    template: `
    <form #resultinfoForm = "ngForm" [rxwebForm]="resultinfoForm">
      <div class="form-group">
        <label>Maths</label>
          <input type="text" name="maths" [(ngModel)]="resultinfo.maths"  class="form-control" [minNumber]="{'value':35}"/>

      </div>
      <div class="form-group">
        <label>Science</label>
          <input type="text" name="science" [(ngModel)]="resultinfo.science"  class="form-control" [minNumber]="{'value':35,'message':'Number should not be less than 35'}"/>

      </div>
      <div class="form-group">
        <label>Statstics</label>
          <input type="text" name="statstics" [(ngModel)]="resultinfo.statstics"  class="form-control" [minNumber]="minNumber"/>
      </div>
      <button [disabled]="!resultinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class MinNumberValidationComponent {
    resultinfo: ResultInfo = new ResultInfo();
    minNumber = {'value':35,'conditionalExpression':'x => x.maths == 50'}
  }