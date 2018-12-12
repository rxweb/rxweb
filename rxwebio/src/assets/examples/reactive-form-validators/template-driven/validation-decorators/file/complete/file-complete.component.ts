import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-file-complete-template-driven-validation-decorators',
    templateUrl: './file-complete.component.html'
})
export class FileCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
