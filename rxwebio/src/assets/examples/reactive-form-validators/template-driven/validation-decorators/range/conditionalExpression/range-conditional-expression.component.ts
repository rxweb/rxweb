import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { EmployeeInfo } from './employee-info.model';

@Component({
    selector: 'app-range-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './range-conditional-expression.component.html'
})
export class RangeConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    employeeinfo: EmployeeInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.employeeinfo= new EmployeeInfo()
    }
}
