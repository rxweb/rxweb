import { Component, OnInit,Input } from '@angular/core';
import { ApplicationConfiguration, ApplicationBroadcaster } from "../../core";
import {RxPopup } from './popup.service';


@Component({
    templateUrl: './validation-failed.component.html',
})
export class ValidationFailedComponent  {
    validationFailed: any;
    @Input() messages: string[];
    constructor(private popupService: RxPopup) {
        this.validationFailed = ApplicationConfiguration.get("popup.validationFailed");
    }

    hide(): void {
        this.popupService.hide(ValidationFailedComponent);
    }
}
