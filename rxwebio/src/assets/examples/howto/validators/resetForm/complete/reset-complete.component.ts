import { Component, OnInit } from '@angular/core';
import { RxwebValidators,RxFormGroup,RxFormBuilder ,FormGroupExtension} from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-reset-complete-validator',
    templateUrl: './reset-complete.component.html'
})
export class ResetCompleteValidatorComponent implements OnInit {
    userFormGroup: RxFormGroup
    
	constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient )
	{ }

    ngOnInit() {
              
   this.userFormGroup = <RxFormGroup>this.formBuilder.group({
    firstName:[''],
    lastName:[''],
    userName:[''],
    password:['']
        });
    }
     resetForm(){
        this.userFormGroup.resetForm();
       
      }
}
