import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-extension-complete-template-driven-validation-directives',
    templateUrl: './extension-complete.component.html'
})
export class ExtensionCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}
