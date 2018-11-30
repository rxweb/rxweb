import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { WebSiteInfoModel } from './web-site-info-model.model';

@Component({
    selector: 'app-url-add-template-driven',
    templateUrl: './url-add.component.html'
})
export class UrlAddTemplateDrivenComponent implements OnInit {
    websiteinfomodel: WebSiteInfoModel
	
    constructor(
    ) { }

    ngOnInit() {
       this.websiteinfomodel= new WebSiteInfoModel()
    }
}
