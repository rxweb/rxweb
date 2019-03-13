import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-hexColor-dynamic-validator',
    templateUrl: './hex-color-dynamic.component.html'
})
export class HexColorDynamicValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/hexColor/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var hexcolorInfo = { color:'', footerHexCode:'', headerHexcolorCode:'', bodyHexcolorCode:'',  }
			this.hexcolorInfoFormGroup = this.formBuilder.group(hexcolorInfo,formBuilderConfiguration);
		})
    }
}
