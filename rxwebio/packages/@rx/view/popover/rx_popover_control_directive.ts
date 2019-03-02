import {
    ElementRef,
    HostListener,
    Input,
    Inject,
    Directive,
    OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef } from "@angular/core"
import { DOCUMENT } from '@angular/platform-browser';

import {OverlayViewHost, OverlayPositionHost, OffSetModel} from "../../core/view/overlay_view_host";
import {ComponentView, ComponentType} from "../../core/view/view";
import {CLICK_EVENT, MOUSEOVER_EVENT, TARGET_ELEMENT } from "../../util/constants/constants";

export class PopoverModel {
    position: string;
    trigger: string;
    component: any;
    params: {
        [key: string]: any;
    }
}

@Directive({
    selector: '[rxPopover]',
    exportAs: 'popover'
})
export class RxPopoverDirective implements OnDestroy {
    overlayViewHost: OverlayViewHost;
    overlayPositionHost: OverlayPositionHost;
    private componentView: any;
    private timeOutId: number;
    popoverModel: PopoverModel;
    isOpen: boolean = false;
    constructor(private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(DOCUMENT) document: any
    ) {
        this.overlayViewHost = new OverlayViewHost(document);
        this.overlayPositionHost = new OverlayPositionHost();
    }

    @Input('rxPopover') set popover(value: PopoverModel) {
        this.popoverModel = value;
    }

    @Input() data: any;

    @HostListener(CLICK_EVENT)
    onClick() {
        if (this.popoverModel && this.popoverModel.trigger === CLICK_EVENT)
            this.isOpen = !this.isOpen;
        if (this.isOpen)
            this.show();
        else
            this.hide();
    }

    hide(): void {
        this.overlayViewHost.setStyle({ 'display':'none' });
    }

    show() {
        if (!this.componentView) {
            this.setOverlay();
            if (this.timeOutId)
                window.clearTimeout(this.timeOutId);
            this.timeOutId = window.setTimeout(() => {
                this.showPopover();
            }, 200)
        } else {
            this.overlayViewHost.setStyle({ 'display': 'block' });
        }
       
    }

    showPopover() {
        let offSetModel = new OffSetModel(this.popoverModel.position,
            this.overlayPositionHost.getClientRectangle(this.elementRef.nativeElement),
            this.overlayPositionHost.getOffset(this.elementRef.nativeElement),
            this.overlayPositionHost.getOffset(this.overlayViewHost.element));
        var calculatedOffset = this.overlayPositionHost.getCalculatedOffset(offSetModel);
        this.overlayViewHost.applyPlacement(calculatedOffset);
        this.overlayViewHost.setStyle({ 'display': 'block' });
    }

    setOverlay(): void {
        var componentElement = this.createComponent();
        this.overlayViewHost.createElement(['popover', 'fade', this.popoverModel.position, 'in']);
        this.overlayViewHost.appendChild(componentElement);
    }

    createComponent(): HTMLElement {
        this.componentView = new ComponentView(this.popoverModel.component, this.viewContainerRef, this.componentFactoryResolver);
        this.componentView.create(this.data);
        return this.componentView.rootNode();
    }

    ngOnDestroy(): void {
        if (this.componentView) {
            this.componentView.destroy();
            this.componentView = undefined;
            this.overlayViewHost.destroy();
            this.overlayViewHost = undefined;
            this.overlayPositionHost = undefined;
        }
    }
}