import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-fileSize-add-template-driven-validation-decorators',
    templateUrl: './file-size-add.component.html'
})
export class FileSizeAddTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
