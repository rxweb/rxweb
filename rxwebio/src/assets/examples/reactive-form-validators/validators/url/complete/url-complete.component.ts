import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-complete-validator',
    templateUrl: './url-complete.component.html'
})
export class UrlCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            adminWebsiteUrl:['', RxwebValidators.url()], 
            qaWebsiteUrl:['', RxwebValidators.url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in"  })], 
            customerWebsiteUrl:['', RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"'  })], 
            maintenanceWebSiteUrl:['', RxwebValidators.url({message:'{{0}} Is not the correct url pattern.' })], 
        });
    }
}
