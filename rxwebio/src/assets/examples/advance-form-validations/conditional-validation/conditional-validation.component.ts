import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-conditional-complete',
    templateUrl: './conditional-validation.component.html'
})
export class ConditionalValidationComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
this.userFormGroup = this.formBuilder.group({
    
        fullName:[''], 
        age:[''],
        licenseNo:['',RxwebValidators.required({conditionalExpression:(x,y)=>x.age >= 18})],

});
}
}