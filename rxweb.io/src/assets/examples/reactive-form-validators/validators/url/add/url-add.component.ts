import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-add-validator',
    templateUrl: './url-add.component.html'
})
export class UrlAddValidatorComponent implements OnInit {
    webSiteInfoModelFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.webSiteInfoModelFormGroup = this.formBuilder.formGroup({
										adminWebsiteUrl:['',RxwebValidators.url()], 
								});
    }
}
