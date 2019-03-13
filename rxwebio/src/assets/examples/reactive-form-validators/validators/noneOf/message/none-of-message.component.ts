import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-noneOf-message-validator',
    templateUrl: './none-of-message.component.html'
})
export class NoneOfMessageValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedHobbies: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    hobbiesArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            hobbies:['',RxwebValidators.noneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please do not select any hobby"})]
        });
        this.http.get("assets/examples/reactive-form-validators/validators/noneOf/message/none-of.json?v="+environment.appVersion).subscribe(response => {
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
