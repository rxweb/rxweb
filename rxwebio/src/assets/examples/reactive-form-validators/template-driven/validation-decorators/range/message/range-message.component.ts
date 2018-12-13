import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { EmployeeInfo } from './employee-info.model';

@Component({
    selector: 'app-range-message-template-driven-validation-decorators',
    templateUrl: './range-message.component.html'
})
export class RangeMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    employeeinfo: EmployeeInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.employeeinfo= new EmployeeInfo()
    }
}
