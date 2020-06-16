import { Component, OnInit } from "@angular/core"
import { IFormGroup, Options } from '@rxweb/reactive-form-validators';

import { User } from '../models/user';
import { Skill } from '../models/skill';

import { FormBuilder } from '@angular/forms';
@Component({
    selector: 'strongly-typed',
    templateUrl: './strongly-typed-reactive-form.component.html'
})
export class StronglyTypedReactiveFormComponent implements OnInit {
    serverData = { firstName: 'John', address: { countryName: "India" }, dob: "10/15/2020", skills: [{ name: 'Angular' }] }

    user: User

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.user = (this.formBuilder.group(User, <Options>{ data: this.serverData }) as IFormGroup<User>).modelInstance;
    }


    addSkill() {
        this.user.skills.push(new Skill());
    }

    removeSkill(index: number) {
        this.user.skills.splice(index, 1)
    }

    submit() {
        /// POST JSON object to the server
        console.log(this.user)
        /// POST FormData to the server
        console.log(this.user.formGroup.toFormData())
    }
}
