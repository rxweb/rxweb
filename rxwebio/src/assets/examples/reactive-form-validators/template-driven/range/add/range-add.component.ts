import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { EmployeeInfo } from './employee-info.model';

@Component({
    selector: 'app-range-add-template-driven',
    templateUrl: './range-add.component.html'
})
export class RangeAddTemplateDrivenComponent implements OnInit {
    employeeinfo: EmployeeInfo

    constructor(
    ) { }

    ngOnInit() {
       this.employeeinfo= new EmployeeInfo()
    }
}
