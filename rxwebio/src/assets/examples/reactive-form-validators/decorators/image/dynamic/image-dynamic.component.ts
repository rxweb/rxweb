import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-image-dynamic',
    templateUrl: './image-dynamic.component.html'
})
export class ImageDynamicComponent implements OnInit {
    userInfoFormGroup: FormGroup
				ImageTypes = [ "Picture", "IdentityCard",];

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let userInfo = new UserInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/image/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.userInfoFormGroup = this.formBuilder.formGroup(userInfo,formBuilderConfiguration);
        })
    }
}
