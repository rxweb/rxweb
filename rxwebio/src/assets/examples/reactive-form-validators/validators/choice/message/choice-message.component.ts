import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-choice-message-validator',
    templateUrl: './choice-message.component.html'
})
export class ChoiceMessageValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedHobbies: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    hobbiesArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            hobbies:['',RxwebValidators.choice({maxLength:4,message: "Please select upto 4 hobby"})]
        });
        this.http.get("assets/examples/reactive-form-validators/validators/choice/message/choice.json?v="+environment.appVersion).subscribe(response => {
            this.hobbiesArray = response['hobbiesArray'];
        })
    }

    addHobby(element: any, index: number) {
        element.checked ? this.selectedHobbies.push(element.value) : this.selectedHobbies.splice(index, 1);
        this.employeeInfoFormGroup.controls.hobbies.setValue(this.selectedHobbies);
    }
}
