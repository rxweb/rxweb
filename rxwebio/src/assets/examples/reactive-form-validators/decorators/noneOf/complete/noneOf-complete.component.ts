import { Component, OnInit } from '@angular/core';
import { EmployeeInfo } from './employee-info.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-complete-noneOf',
  templateUrl: './noneOf-complete.component.html',
})
export class NoneOfComponentComponent implements OnInit {
  
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

  skillsArray : any= [{
    name: 'MVC',
    checked: false
  }, {
    name: 'Singing',
    checked: false
  }, {
    name: 'Dancing',
    checked: false
  }, {
    name: 'C#',
    checked: false
  }, {
    name: 'Web Api',
    checked: false
  }, {
    name: 'SQL Server',                     
    checked: false
  },];
                                   
  hobbiesArray : any= [{
    name: 'Drawing',
    checked: false
  }, {
    name: 'Singing',
    checked: false
  }, {
    name: 'Dancing',
    checked: false
  }, {
    name: 'Travelling',
    checked: false
  }, {
    name: 'Sports',
    checked: false
  },];

  constructor(private formBuilder:RxFormBuilder) { }

  ngOnInit() {
    let employeeInfo = new EmployeeInfo();
    employeeInfo.qualifications = [];
    employeeInfo.skills = [];
    employeeInfo.hobbies = [];
    this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
  }

  addQualification(element:any) {
  this.employeeInfoFormGroup.controls.qualifications.setValue([element.value])
  }

  addSkill(element:any) {
  this.employeeInfoFormGroup.controls.skills.setValue([element.value])
  }

  addHobby(element:any) {
    this.employeeInfoFormGroup.controls.hobbies.setValue([element.value])
    }

}
