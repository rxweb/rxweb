import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-image-complete-template-driven-validation-decorators',
    templateUrl: './image-complete.component.html'
})
export class ImageCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
					ImageTypes = [ "Picture", "IdentityCard",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
