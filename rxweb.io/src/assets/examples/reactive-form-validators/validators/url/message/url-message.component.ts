import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-message-validator',
    templateUrl: './url-message.component.html'
})
export class UrlMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										maintenanceWebSiteUrl:['', RxwebValidators.url({message:'Is not the correct url pattern.' })], 
								});
    }
}
