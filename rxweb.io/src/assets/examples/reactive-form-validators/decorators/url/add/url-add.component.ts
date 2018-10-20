import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { WebSiteInfoModel } from './web-site-info-model.model';

@Component({
    selector: 'app-url-add',
    templateUrl: './url-add.component.html'
})
export class UrlAddComponent implements OnInit {

    webSiteInfoModelFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let webSiteInfoModel = new WebSiteInfoModel();
        this.webSiteInfoModelFormGroup = this.formBuilder.formGroup(webSiteInfoModel);
    }
}
