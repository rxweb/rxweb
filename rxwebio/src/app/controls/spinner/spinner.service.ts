import { Injectable } from '@angular/core';

@Injectable()
export class RxSpinner {
    element: HTMLElement;
    timeOut: number;
    timeOutHide:number;
    constructor() {
        this.element = document.getElementById('rx-spinner');
    }

    show(): void {
        //document.body.classList.add("fade")
        if (!this.element) 
            this.element = document.getElementById("rx-spinner");
        if (this.timeOut)
            window.clearTimeout(this.timeOut);
        this.timeOut = window.setTimeout(() => {
            this.element.className = "spinner-in"
        },1)
    }

    hide(): void {
        if (this.timeOutHide)
            window.clearTimeout(this.timeOutHide);
        this.timeOutHide = window.setTimeout(() => {
            // document.body.classList.remove("fade")
             this.element.className = "fade in hide"
        }, 1000)
    }
}
