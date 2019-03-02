import { Component, OnInit, Input } from '@angular/core';
import { ApplicationConfiguration, ApplicationBroadcaster } from "../../core";
import {RxPopup } from './popup.service';


@Component({
    templateUrl: './unauthorized-access.component.html',
})
export class UnAuthorizedAccessComponent {
    unAuthorized: any;
    constructor(private popupService: RxPopup) {
        this.unAuthorized = ApplicationConfiguration.get("popup.unAuthorized");
    }

    hide(): void {
        this.popupService.hide(UnAuthorizedAccessComponent);
    }
}
