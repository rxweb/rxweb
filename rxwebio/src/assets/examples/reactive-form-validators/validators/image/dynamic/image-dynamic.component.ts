import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-image-dynamic-validator',
    templateUrl: './image-dynamic.component.html'
})
export class ImageDynamicValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				ImageTypes = [ "Picture", "IdentityCard",];
	
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/image/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var userInfo = { imageType:'', profilePhoto:'', signature:'', voterId:'', identityCard:'', drivinglicense:'', aadharCard:'', panCard:'', residenceProof:'',  }
			this.userInfoFormGroup = this.formBuilder.group(userInfo,formBuilderConfiguration);
		})
    }
}
