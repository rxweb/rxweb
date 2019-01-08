import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-unique-add-validator',
    templateUrl: './unique-add.component.html'
})
export class UniqueAddValidatorComponent implements OnInit {
    employeeFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.employeeFormGroup = this.formBuilder.group({
            fullName:[''], 
            skills:this.formBuilder.array([
              this.getSkillFormGroup()
            ])
        });
    }

    addSkill(){
        let skillsArray = <FormArray>this.employeeFormGroup.controls.skills;
        skillsArray.push(this.getSkillFormGroup());
      }
  
      getSkillFormGroup(){
        return this.formBuilder.group({
          skillName:['',RxwebValidators.unique()]
        })
      }

}
