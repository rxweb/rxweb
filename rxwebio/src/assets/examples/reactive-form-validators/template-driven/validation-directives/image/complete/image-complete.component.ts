import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-image-complete-template-driven-validation-directives',
    templateUrl: './image-complete.component.html'
})
export class ImageCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    userinfo: UserInfo
					ImageTypes = [ "Picture", "IdentityCard",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
