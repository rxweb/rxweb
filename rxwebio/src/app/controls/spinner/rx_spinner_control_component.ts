import { Component, OnInit, ElementRef, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


import { RxSpinner } from './spinner.service';

@Component({
    selector: 'rx-spinner',
    templateUrl: 'rx_spinner_control_component.html',
})
export class RxSpinnerComponent {
    loadin: string = "hide";
    constructor() {
    }
}
