import { Component } from "@angular/core";





export class EmployeeInfo {

	age: number;

	projectDuration: number;

	experience: number;

	salary: number;

}



@Component({
    selector: 'app-range',
    template: `
    <form #employeeinfoForm = "ngForm" [rxwebForm]="employeeinfoForm">
      <div class="form-group">
        <label>Employee Age</label>
          <input type="text" name="age" [(ngModel)]="employeeinfo.age"  class="form-control" [range]="{'minimumNumber':18,'maximumNumber':60}"/>	
      </div>
      <div class="form-group">
        <label>Employee Experience</label>
          <input type="text" name="experience" [(ngModel)]="employeeinfo.experience"  class="form-control" [range]="range"/>
  
      </div>
      <div class="form-group">
        <label>Salary</label>
          <input type="text" name="salary" [(ngModel)]="employeeinfo.salary"  class="form-control" [range]="{'minimumNumber':1000,'maximumNumber':200000,'message':'Your Salary should be between 1000 to 200000.'}"/>
  	
      </div>
      <button [disabled]="!employeeinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
   `
  })
  export class RangeValidationComponent {
    employeeinfo: EmployeeInfo = new EmployeeInfo();
    range =  {'minimumNumber':2,'maximumNumber':20,'conditionalExpression':'x => x.age >=25'} 
  }