import { Component, OnInit } from '@angular/core';
import { RxwebValidators,RxFormGroup,RxFormBuilder ,FormGroupExtension} from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-reset-complete',
    templateUrl: './reset-complete.component.html'
})
export class ResetCompleteValidatorComponent implements OnInit {
    userFormGroup: RxFormGroup
    
	constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient )
	{ }

    ngOnInit() {
              
   this.userFormGroup = <RxFormGroup>this.formBuilder.group({
    firstName:['',RxwebValidators.required()],
    lastName:['',RxwebValidators.required()],
    userName:['',RxwebValidators.required()],
    password:['',RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })]
        });
    }
     resetForm(){
        this.userFormGroup.resetForm();
       
      }
}
