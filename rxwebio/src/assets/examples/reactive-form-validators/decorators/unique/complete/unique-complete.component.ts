import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Employee, Skill } from './employee.model';

@Component({
    selector: 'app-unique-complete',
    templateUrl: './unique-complete.component.html'
})
export class UniqueCompleteComponent implements OnInit {
    employeeFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder) { }

    ngOnInit() {
        let employee = new Employee();
        employee.skills = new Array<Skill>();
        employee.hobbies = new Array<Skill>();
        let skill = new Skill();
        employee.skills.push(skill);
        employee.hobbies.push(skill);
        this.employeeFormGroup = this.formBuilder.formGroup(employee);
    }

    addSkill() {
        let skills = this.employeeFormGroup.controls.skills as FormArray;
        skills.push(this.formBuilder.formGroup(Skill));
    }

    addHobby() {
        let hobbies = this.employeeFormGroup.controls.hobbies as FormArray;
        hobbies.push(this.formBuilder.formGroup(Skill));
    }

}