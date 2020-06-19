import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from '@angular/forms';
import { IFormGroup } from "@rxweb/types"
import { FormControlStrategy, ErrorMessageBindingStrategy } from '@rxweb/form-strategy';
import { MessagingStrategy } from './messaging-strategy.model';
@Component({
    selector: "app-messaging-strategy",
    templateUrl: './messaging-strategy.component.html',
})
export class MessagingStrategyComponent implements OnInit {

    formGroup: IFormGroup<MessagingStrategy>;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            onDirty: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnDirty } })],
            onTouched: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnTouched } })],
            onDirtyOrTouched: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnDirtyOrTouched } })],
            onDirtyOrSubmit: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnDirtyOrSubmit } })],
            onTouchedOrSubmit: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnTouchedOrSubmit } })],
            onSubmit: ['', [Validators.required], new FormControlStrategy({ conditional: { messageBindingStrategy: ErrorMessageBindingStrategy.OnSubmit } })]
        }) as IFormGroup<MessagingStrategy>;
    }

    submit() {
        debugger;
        this.formGroup.submitted = true;
    }
}
