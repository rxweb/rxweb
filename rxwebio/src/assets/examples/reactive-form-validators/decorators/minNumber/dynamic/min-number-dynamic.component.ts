import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-dynamic',
    templateUrl: './min-number-dynamic.component.html'
})
export class MinNumberDynamicComponent implements OnInit {
    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let resultInfo = new ResultInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/minNumber/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.resultInfoFormGroup = this.formBuilder.formGroup(resultInfo,formBuilderConfiguration);
        })
    }
}
