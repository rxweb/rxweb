export const FORM_BUILDER_VALIDATOR_COMPONENT :string = `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: '##selectorName##',
    templateUrl: '##templateUrl##'
})
export class '##componentName##' implements OnInit {
    '##modelName##': FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.'##modelName##' = this.formBuilder.group({`+ 
                        
        `});
    }
}`
