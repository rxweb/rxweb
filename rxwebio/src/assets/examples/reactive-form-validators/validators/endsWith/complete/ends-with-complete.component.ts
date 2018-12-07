import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-endsWith-complete-validator',
    templateUrl: './ends-with-complete.component.html'
})
export class EndsWithCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.endsWith({value:'t' })], 
            profession:['', RxwebValidators.endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Bharat"  })], 
            taskId:['', RxwebValidators.endsWith({value:'1'  ,conditionalExpression:'x => x.name =="Bharat"' })], 
            company:['', RxwebValidators.endsWith({value:'b'  ,message:'{{0}} does not ends with `b`' })], 
        });
    }
}
