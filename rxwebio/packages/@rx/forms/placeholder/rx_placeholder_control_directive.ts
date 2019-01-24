import {Directive, HostListener, Input, AfterViewInit, Renderer, ElementRef } from "@angular/core";

import { ApplicationConfiguration, ApplicationPage} from "../../core"
import {PLACEHOLDER} from "../../util/constants/constants";
import { Subscription } from "rxjs/Rx";

@Directive({
    selector: '[rxPlaceholder]'
})
export class RxPlaceholderDirective {
    private element: Node;
    elementSubscription: Subscription;
    placeHolderName: string;
    placeHolderText: string;
    applicationModuleId: number;
    constructor(private renderer: Renderer, private elementRef: ElementRef)
    {
        this.element = elementRef.nativeElement as Node;
        this.elementSubscription = ApplicationPage.moduleContentSubscriber.subscribe(t => this.textChanged());
    }

    @Input('rxPlaceholder') set placeholder(value: string) {
        this.placeHolderName = value;
        this.textChanged()
    }

    @Input() data: any[]

    @Input('formControlName') formControlName:string;


    textChanged(): void {
        if (this.formControlName)
            this.placeHolderName = this.formControlName;
        this.applicationModuleId = this.applicationModuleId ? this.applicationModuleId : ApplicationPage.getActiveModule();
        if (this.data)
            this.placeHolderText = ApplicationPage.localizeValue(this.placeHolderName, 'placeholder', this.applicationModuleId, this.data);
        else
            this.placeHolderText = ApplicationPage.localizeValue(this.placeHolderName, 'placeholder', this.applicationModuleId);
        if (this.placeHolderText != undefined)
            this.setPlaceholder(this.placeHolderText);
        else
            this.setPlaceholder("N/A");
    }

    setPlaceholder(value: string): void {
        this.renderer.setElementAttribute(
            this.element, PLACEHOLDER, value);
    }
}
