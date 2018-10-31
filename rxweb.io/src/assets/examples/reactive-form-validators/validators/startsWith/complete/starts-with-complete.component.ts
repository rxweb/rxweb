import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-startsWith-complete-validator',
    templateUrl: './starts-with-complete.component.html'
})
export class StartsWithCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.startsWith({value:'B'  ,message:'{{0}} does not starts with `B`' })], 
            profession:['', RxwebValidators.startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  })], 
            taskId:['', RxwebValidators.startsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' })], 
        });
    }
}
