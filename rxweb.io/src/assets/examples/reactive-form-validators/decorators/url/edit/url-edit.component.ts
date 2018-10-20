import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { WebSiteInfoModel } from './web-site-info-model.model';

@Component({
    selector: 'app-url-edit',
    templateUrl: './url-edit.component.html'
})
export class UrlEditComponent implements OnInit {

    webSiteInfoModelFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/url/edit/web-site-info-model-data.json').subscribe(webSiteInfoModel => {
            this.webSiteInfoModelFormGroup = this.formBuilder.formGroup<WebSiteInfoModel>(WebSiteInfoModel,webSiteInfoModel);
        })
    }
}
