import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { WebSiteInfoModel } from '../web-site-info-model.model';

@Component({
    selector: 'app-web-site-info-model-add',
    templateUrl: './web-site-info-model-add.component.html'
})
export class WebSiteInfoModelAddComponent implements OnInit {

    webSiteInfoModelFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let webSiteInfoModel = new WebSiteInfoModel();
        this.webSiteInfoModelFormGroup = this.formBuilder.formGroup(webSiteInfoModel);
    }
}
