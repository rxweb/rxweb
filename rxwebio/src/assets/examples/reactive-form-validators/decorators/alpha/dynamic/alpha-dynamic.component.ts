import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-dynamic',
    templateUrl: './alpha-dynamic.component.html'
})
export class AlphaDynamicComponent implements OnInit {
    addressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let addressInfo = new AddressInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/alpha/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.addressInfoFormGroup = this.formBuilder.formGroup(addressInfo,formBuilderConfiguration);
        })
    }
}
