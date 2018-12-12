import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { EmployeeInfo } from './employee-info.model';

@Component({
    selector: 'app-range-maximumNumber-template-driven-validation-decorators',
    templateUrl: './range-maximum-number.component.html'
})
export class RangeMaximumNumberTemplateDrivenValidationDecoratorsComponent implements OnInit {
    employeeinfo: EmployeeInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.employeeinfo= new EmployeeInfo()
    }
}
