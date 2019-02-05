import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { DigitalInfo } from './digital-info.model';

@Component({
    selector: 'app-grid-dynamic',
    templateUrl: './grid-dynamic.component.html'
})
export class GridDynamicComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let digitalInfo = new DigitalInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/grid/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.digitalInfoFormGroup = this.formBuilder.formGroup(digitalInfo,formBuilderConfiguration);
        })
    }
}
