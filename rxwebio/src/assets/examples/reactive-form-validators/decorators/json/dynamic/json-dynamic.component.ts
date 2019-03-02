import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-dynamic',
    templateUrl: './json-dynamic.component.html'
})
export class JsonDynamicComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let jsonInfo = new JsonInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/json/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.jsonInfoFormGroup = this.formBuilder.formGroup(jsonInfo,formBuilderConfiguration);
        })
    }
}
