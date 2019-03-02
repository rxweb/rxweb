import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexColor-dynamic',
    templateUrl: './hex-color-dynamic.component.html'
})
export class HexColorDynamicComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let hexcolorInfo = new HexcolorInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/hexColor/dynamic/dynamic.json?v=' + environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.hexcolorInfoFormGroup = this.formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
        })
    }
}
