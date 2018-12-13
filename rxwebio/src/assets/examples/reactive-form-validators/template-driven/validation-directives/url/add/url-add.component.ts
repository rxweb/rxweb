import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { WebSiteInfoModel } from './web-site-info-model.model';

@Component({
    selector: 'app-url-add-template-driven-validation-directives',
    templateUrl: './url-add.component.html'
})
export class UrlAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    websiteinfomodel: WebSiteInfoModel
	
    constructor(
    ) { }

    ngOnInit() {
       this.websiteinfomodel= new WebSiteInfoModel()
    }
}
