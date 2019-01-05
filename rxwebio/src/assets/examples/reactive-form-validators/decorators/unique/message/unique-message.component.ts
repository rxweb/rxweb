import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Employee, Skill } from './employee.model';

@Component({
    selector: 'app-unique-message',
    templateUrl: './unique-message.component.html'
})
export class UniqueMessageComponent implements OnInit {
    employeeFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder) { }

        ngOnInit() {
          let employee = new Employee();
          employee.hobbies = new Array<Skill>();
          let skill = new Skill();
          employee.hobbies.push(skill);
          this.employeeFormGroup = this.formBuilder.formGroup(employee);
      }
  
      addHobby(){
          let  hobbies = this.employeeFormGroup.controls.hobbies as FormArray;
          hobbies.push(this.formBuilder.formGroup(Skill));
        }
  

}