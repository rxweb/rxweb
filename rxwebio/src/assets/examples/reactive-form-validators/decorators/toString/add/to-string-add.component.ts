import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-toString-add',
    templateUrl: './to-string-add.component.html'
})
export class ToStringAddComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let user = new User();
        this.userFormGroup = this.formBuilder.formGroup(user);
    }
    checkType(fieldName,typeName){
        return typeof this.userFormGroup.value[fieldName] == typeName 
      }
}
