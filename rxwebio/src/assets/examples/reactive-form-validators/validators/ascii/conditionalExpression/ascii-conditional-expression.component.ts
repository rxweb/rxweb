import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-conditionalExpression-validator',
    templateUrl: './ascii-conditional-expression.component.html'
})
export class AsciiConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            language:['',], 
            alphabetAsciiCode:['', RxwebValidators.ascii({conditionalExpression:'x => x.language =="Java"' })], 
            numberAsciiCode:['', RxwebValidators.ascii({conditionalExpression:(x,y) => x.language == "Java"  })], 
        });
    }
}
