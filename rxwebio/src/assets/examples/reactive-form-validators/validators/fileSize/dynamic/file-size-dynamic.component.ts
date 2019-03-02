import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-fileSize-dynamic-validator',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	
	
	
	
	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/fileSize/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var userInfo = { fileType:'', videoFile:'', audioFile:'', imageFile:'', documentFile:'', contactFile:'', profilePicture:'',  }
			this.userInfoFormGroup = this.formBuilder.group(userInfo,formBuilderConfiguration);
		})
    }
}
