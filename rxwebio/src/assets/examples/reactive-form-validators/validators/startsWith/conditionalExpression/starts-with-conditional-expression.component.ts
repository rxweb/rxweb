import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-startsWith-conditionalExpression-validator',
    templateUrl: './starts-with-conditional-expression.component.html'
})
export class StartsWithConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.startsWith({value:'B' })], 
            taskId:['', RxwebValidators.startsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' })], 
            profession:['', RxwebValidators.startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  })], 
        });
    }
}
