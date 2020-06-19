import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from '@angular/forms';
import { IFormGroup } from "@rxweb/types"
import { FormControlStrategy } from '@rxweb/form-strategy';
import { ConditionalErrorMessaging } from './conditiona-error-messaging.model';
@Component({
    selector: "app-conditional-messaging",
    templateUrl: './conditional-error-messaging.component.html',
})
export class ConditionalMessagingComponent implements OnInit {

    formGroup: IFormGroup<ConditionalErrorMessaging>;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            countryName: ['', [Validators.required], new FormControlStrategy({ conditional: { disable: (x) => x.firstName == "Bharat" } })],
        }) as IFormGroup<ConditionalErrorMessaging>;
    }
}
