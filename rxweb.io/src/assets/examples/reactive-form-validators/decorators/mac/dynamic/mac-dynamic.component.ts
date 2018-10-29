import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-dynamic',
    templateUrl: './mac-dynamic.component.html'
})
export class MacDynamicComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let macAddressInfo = new MacAddressInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/mac/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.macAddressInfoFormGroup = this.formBuilder.formGroup(macAddressInfo,formBuilderConfiguration);
        })
    }
}
