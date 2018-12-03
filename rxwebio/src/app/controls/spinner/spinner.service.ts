import { Injectable } from '@angular/core';

@Injectable()
export class RxSpinner {
    element: HTMLElement;
    timeOut: number;
    constructor() {
        this.element = document.getElementById('rx-spinner');
    }

    show(): void {
        if(!this.element)
            this.element = document.getElementById("rx-spinner");
        this.element.className = "page-loader fade"
        if (this.timeOut)
            window.clearTimeout(this.timeOut);
        this.timeOut = window.setTimeout(() => {
            this.element.classList.add("spinner-in")
            this.element.classList.add("in")
        },20)
    }

    hide(): void {
        this.element.className = "page-loader fade in hide"
    }
}
