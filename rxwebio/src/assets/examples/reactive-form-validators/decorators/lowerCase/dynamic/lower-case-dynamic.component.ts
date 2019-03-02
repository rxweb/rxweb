import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-lowerCase-dynamic',
    templateUrl: './lower-case-dynamic.component.html'
})
export class LowerCaseDynamicComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/lowerCase/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
        })
    }
}
