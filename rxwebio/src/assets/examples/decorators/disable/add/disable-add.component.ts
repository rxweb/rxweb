import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { User } from './user.model';
@Component({
    selector: 'app-disable-add',
    templateUrl: './disable-add.component.html'
})
export class DisableAddComponent implements OnInit {
    currentMode: string = "View";
    userFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let user = new User();
        user.modeType = this.currentMode;
        this.userFormGroup = this.formBuilder.formGroup(user);
    }
    changeMode() {
        this.currentMode = this.currentMode == "View" ? "Edit" : "View";
        this.userFormGroup.controls.modeType.setValue(this.currentMode);
    }
}
