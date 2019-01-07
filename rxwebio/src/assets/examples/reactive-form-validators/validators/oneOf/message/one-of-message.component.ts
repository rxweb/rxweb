import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-oneOf-message-validator',
    templateUrl: './one-of-message.component.html'
})
export class OneOfMessageValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedHobbies: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    hobbiesArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            hobbies:['',RxwebValidators.oneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select no hobbies"})]
        });
        this.http.get("assets/examples/reactive-form-validators/decorators/oneOf/message/one-of.json").subscribe(response => {
            this.hobbiesArray = response['hobbiesArray'];
        })
    }

    addHobby(element: any, index: number) {
        element.checked ? this.selectedHobbies.push(element.value) : this.selectedHobbies.splice(index, 1);
        this.employeeInfoFormGroup.controls.hobbies.setValue(this.selectedHobbies);
    }
}
