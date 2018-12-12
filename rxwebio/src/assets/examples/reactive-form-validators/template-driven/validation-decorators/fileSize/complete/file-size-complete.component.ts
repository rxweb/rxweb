import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-fileSize-complete-template-driven-validation-decorators',
    templateUrl: './file-size-complete.component.html'
})
export class FileSizeCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
