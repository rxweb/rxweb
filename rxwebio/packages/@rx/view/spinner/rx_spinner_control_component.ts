import { Component, OnInit, ElementRef, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


import { RxSpinner } from './spinner.service';
import {ApplicationConfiguration } from '../../core/applicationconfiguration';
const KEY_ESC: number = 27;

@Component({
    selector: 'rx-spinner',
    templateUrl: 'rx_spinner_control_component.html',
})
export class RxSpinnerComponent {
    loadin: string = "hide";
    loadingText: string;
    constructor() {
        //this.loadingText = ApplicationConfiguration.get("spinner").loadingText;
    }
}
