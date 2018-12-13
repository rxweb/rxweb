import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { EmployeeInfo } from './employee-info.model';

@Component({
    selector: 'app-range-complete-template-driven-validation-directives',
    templateUrl: './range-complete.component.html'
})
export class RangeCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeinfo: EmployeeInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.employeeinfo= new EmployeeInfo()
    }
}
