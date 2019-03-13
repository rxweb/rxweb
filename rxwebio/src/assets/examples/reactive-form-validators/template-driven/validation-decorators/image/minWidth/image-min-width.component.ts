import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-image-minWidth-template-driven-validation-decorators',
    templateUrl: './image-min-width.component.html'
})
export class ImageMinWidthTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
