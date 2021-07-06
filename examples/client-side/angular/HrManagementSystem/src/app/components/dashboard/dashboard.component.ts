import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RxFormBuilder, RxFormGroup, RxwebValidators } from "@rxweb/reactive-form-validators";
import { translate } from "@rxweb/translate";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
    @translate({translationName:'dashboard'}) dashboard : any;
    userFormGroup: RxFormGroup

	constructor(
        private formBuilder: RxFormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = <RxFormGroup>this.formBuilder.group({
            userName:['', RxwebValidators.required()], 
              password : ['',[RxwebValidators.alpha(),RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })]],
        });
      
    }
   
}