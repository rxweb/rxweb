import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Employee, Skill } from './employee.model';

@Component({
    selector: 'app-unique-add',
    templateUrl: './unique-add.component.html'
})
export class UniqueAddComponent implements OnInit {
    employeeFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder) { }

    ngOnInit() {
        let employee = new Employee();
        employee.skills = new Array<Skill>();
        let skill = new Skill();
        employee.skills.push(skill);
        this.employeeFormGroup = this.formBuilder.formGroup(employee);
    }

    addSkill(){
        let  skills = this.employeeFormGroup.controls.skills as FormArray;
        skills.push(this.formBuilder.formGroup(Skill));
      }

}