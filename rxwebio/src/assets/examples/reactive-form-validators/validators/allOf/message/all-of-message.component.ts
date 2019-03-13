import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-allOf-message-validator',
    templateUrl: './all-of-message.component.html'
})
export class AllOfMessageValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedHobbies: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    hobbiesArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            hobbies:['',RxwebValidators.allOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select all hobbies"})]
        });
        this.http.get("assets/examples/reactive-form-validators/validators/allOf/message/all-of.json?v="+environment.appVersion).subscribe(response => {
            this.hobbiesArray = response['hobbiesArray'];
        })
    }

    index = 0;
    addHobby(element:any) {
        var value = this.employeeInfoFormGroup.controls.hobbies.value;
        if(!value)
          value = [];
          if(element.checked) {
                value.push(element.value);
                this.index++;
          }
          else
          {
          var indexOf = value.indexOf(element.value);
          value.splice(indexOf,1);
          }
        this.employeeInfoFormGroup.controls.hobbies.setValue(value)
      }
}
