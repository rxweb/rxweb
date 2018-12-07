import { Component, OnInit } from '@angular/core';
import { EmployeeInfo } from './employee-info.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-add-allOf',
  templateUrl: './allOf-add.component.html',
})
export class AllOfAddComponent implements OnInit {
  
  employeeInfoFormGroup : FormGroup;

  qualificationsArray : any= [{
    name: '10th',
    checked: false
  }, {
    name: '12th',
    checked: false
  }, {
    name: 'B.Tech',
    checked: false
  }, {
    name: 'B.C.A.',
    checked: false
  }, {
    name: 'M.Tech',
    checked: false
  }, {
    name: 'M.C.A.',
    checked: false
  },];

  constructor(private formBuilder:RxFormBuilder) { }

  ngOnInit() {
    let employeeInfo = new EmployeeInfo();
    employeeInfo.qualifications = [];
    this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
  }
  addQualification(element:any) {
    this.employeeInfoFormGroup.controls.qualifications.setValue([element.value])
    }
}
