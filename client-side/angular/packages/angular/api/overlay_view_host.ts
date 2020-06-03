import {Inject, Injectable, ComponentFactoryResolver, ComponentFactory} from "@angular/core"

export const DIV_ELEMENT: string = "div";




export class OverlayViewHost {
    element: HTMLElement;

    constructor(private document: Document) { }

    createElement(elementClassNames: string[]): void {
        this.element = this.document.createElement(DIV_ELEMENT);
        if (elementClassNames.length) {
            for (let className of elementClassNames) {
                this.addClass(className);
            }
        }
        this.element.style.left ="0px";
            this.element.style.top = "0px";
        this.appendToBody();
    }

    appendChild(htmlElement: HTMLElement) {
        this.element.appendChild(htmlElement);
       
    }

    show(): void {
        this.setStyle({ 'display': '' });
    }

    hide(): void {
        this.setStyle({ 'display': 'none' })
    }

    addClass(className: string) {
        this.element.classList.add(className);
    }

    removeClass(className: string) {
        this.element.classList.remove(className);
    }

    applyPlacement(calculatedOffset: any) {
            this.element.style.left = String(calculatedOffset.left) + "px";
            this.element.style.top = String(calculatedOffset.top) + "px";
    }

    setStyle(params: {
        [key: string]: any;
    }) {
        let propNames = Object.getOwnPropertyNames(params);
        for (let key of propNames) {
            this.element.style[key] = params[key]
        }
    }

    

    private appendToBody() {
        this.document.body.appendChild(this.element);
    }

    destroy(): void {
        this.element.parentNode.removeChild(this.element);
        this.element = undefined;
    }
}

export class OverlayPositionHost {

    getClientRectangle(htmlElement: HTMLElement): ClientRect {
        let box = htmlElement.getBoundingClientRect();
        var parentNode = htmlElement.parentNode;
        var doc = parentNode.ownerDocument;
        var docElement = doc.documentElement;
        var parentBox = (<any>parentNode).getBoundingClientRect();
        var parentOffset: ClientRect = {
            top: box.top + window.pageYOffset - docElement.clientTop,
            left: box.left + window.pageXOffset - docElement.clientLeft,
            bottom: box.bottom, height: box.height, right: box.right, width: box.width
        };
        return parentOffset;
    }

    getOffset(htmlElement: HTMLElement) {
        return new ElementOffsetModel(htmlElement.offsetWidth, htmlElement.offsetHeight);
    }

    getCalculatedOffset(offSetModel: OffSetModel) {
        if (offSetModel.isCenterOverlay)
            return offSetModel.placement == 'bottom' ? { top: offSetModel.position.top + offSetModel.position.height, left: offSetModel.position.left + (offSetModel.position.width / 2) - (offSetModel.overlayElementOffset.width / 2) } :
                offSetModel.placement == 'top' ? { top: (offSetModel.position.top) - (offSetModel.overlayElementOffset.height), left: offSetModel.position.left + ((offSetModel.mainElementOffset.width - offSetModel.overlayElementOffset.width) / 2) } :
                    offSetModel.placement == 'left' ? { top: (offSetModel.position.top + (offSetModel.position.height / 2) - (offSetModel.overlayElementOffset.height / 2)), left: offSetModel.position.left - offSetModel.overlayElementOffset.width } :
                        { top: (offSetModel.position.top + (offSetModel.position.height / 2) - (offSetModel.overlayElementOffset.height / 2)), left: offSetModel.position.left + offSetModel.position.width }
        else
            return offSetModel.placement == 'bottom' ? { top: offSetModel.position.top + offSetModel.position.height + 5, left: offSetModel.position.left + 5 } :
                offSetModel.placement == 'top' ? { top: (offSetModel.position.top) - (offSetModel.overlayElementOffset.height), left: offSetModel.position.left + ((offSetModel.position.width - offSetModel.overlayElementOffset.width) / 2) } :
                    offSetModel.placement == 'left' ? { top: (offSetModel.position.top + (offSetModel.position.height / 2) - (offSetModel.overlayElementOffset.height / 2)), left: offSetModel.position.left - offSetModel.overlayElementOffset.width } :
                        { top: (offSetModel.position.top + (offSetModel.position.height / 2) - (offSetModel.overlayElementOffset.height / 2)), left: offSetModel.position.left + offSetModel.position.width }

    }
}

export class BackDrop {

    private static overlayViewHost: OverlayViewHost = new OverlayViewHost(document);
    private static validationOverlayViewHost: OverlayViewHost = new OverlayViewHost(document);

    static create(): void {
        this.overlayViewHost = new OverlayViewHost(document);
        this.overlayViewHost.createElement(["modal-backdrop", "fade", "in","show"]);
    }

    static createValidation(): void {
      this.validationOverlayViewHost = new OverlayViewHost(document);
      this.validationOverlayViewHost.createElement(["modal-backdrop-validation", "fade", "in", "show"]);
    }

    static isBackdrop(): boolean {
        return this.overlayViewHost && this.overlayViewHost.element !== undefined;
    }

    static removeValidation(): void {
      this.validationOverlayViewHost.destroy();
      this.validationOverlayViewHost = undefined;
    }

    static remove(): void {
        this.overlayViewHost.destroy();
        this.overlayViewHost = undefined;
    }
}

export class OffSetModel {
    constructor(public placement: string, public position: ClientRect, public mainElementOffset: ElementOffsetModel, public overlayElementOffset: ElementOffsetModel, public isCenterOverlay: boolean = true) { }
}

export class ElementOffsetModel {
    constructor(public width: number, public height: number) { }
}
