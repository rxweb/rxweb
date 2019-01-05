import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-unique-message-validator',
    templateUrl: './unique-message.component.html'
})
export class UniqueMessageValidatorComponent implements OnInit {
    employeeFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.employeeFormGroup = this.formBuilder.group({
              hobbies:this.formBuilder.array([
                this.getHobbyFormGroup()
              ])
        });
    }

      addHobby(){
        let hobbiesArray = <FormArray>this.employeeFormGroup.controls.hobbies;
        hobbiesArray.push(this.getHobbyFormGroup());
      }
  
      getHobbyFormGroup(){
        return this.formBuilder.group({
          hobbyName:['',RxwebValidators.unique({message: 'You must enter a unique value'})]
        })
      }
}
