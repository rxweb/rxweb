import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-dynamic',
    templateUrl: './upper-case-dynamic.component.html'
})
export class UpperCaseDynamicComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let location = new Location();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/upperCase/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.locationFormGroup = this.formBuilder.formGroup(location,formBuilderConfiguration);
        })
    }
}
