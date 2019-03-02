import {
    ContentChildren, Inject, OnInit, OnDestroy,
    QueryList, HostListener,
    Directive, Input, Output, AfterViewInit, Renderer, ElementRef, Component, forwardRef, OnChanges, ViewContainerRef, ComponentFactoryResolver, ComponentFactory
} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, AbstractControl, ValidatorFn } from "@angular/forms"
import { Subscription, Observable } from "rxjs/Rx";

import { DOM_EVENT, BLUR_EVENT, FOCUS_EVENT, FOCUSOUT_EVENT, TARGET_ELEMENT_VALUE } from "../../util/constants/constants";

import { OverlayViewHost, OverlayPositionHost, ElementOffsetModel, OffSetModel } from "../../core/view/overlay_view_host";
import { ComponentView } from "../../core/view/view";
import { RxTooltipDirective } from "../../view/tooltip/rx_tooltip_control_directive";
import { ApplicationConfiguration } from "../../core";
import { emailValidator, requiredValidator } from '../validator/validators/rxvalidators';

@Component({
    selector: 'rx-message',
    template: '<div class="tooltip-arrow"></div> <div class="tooltip-inner tooltip-validation"> {{tipMessage}}</div>'
})
export class RxMessageComponent {
    @Input() tipMessage: string;
    constructor(public elementRef: ElementRef) { }
}

@Directive({
    selector: '[rxMessage]',

    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => RxMessageDirective), multi: true }
    ],

})
export class RxMessageDirective implements OnInit, OnDestroy {
    @ContentChildren(FormControl) private formControlList: QueryList<FormControl>;
    @ContentChildren(RxTooltipDirective) private tooltip: QueryList<RxTooltipDirective>;
    private element: HTMLInputElement;
    private componentView: ComponentView<RxMessageComponent>;
    private overlayViewHost: OverlayViewHost;
    private overlayPositionHost: OverlayPositionHost;
    private isSubscribed: boolean = false;
    private astrickSpanElement: any;
    private messageSpanElement: any;
    private parentNodeElement: any;
    private validateFn: any = () => { };
    private currentMessage: string;
    private currentFormControlName: string;
    private timeOutId: number;
    private controlSubscription: Subscription;
    private conditionalSubscription: Subscription;
    private formControl: FormControl;
    private placeHolderMessage: string;
    private messageText: string;
    private isControlRequired: boolean = false;
    private annotationFunc: any;
    private statusType : string;
    constructor(private renderer: Renderer, private elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef, @Inject(DOCUMENT) private document: any
    ) {
        this.element = elementRef.nativeElement as HTMLInputElement;
        this.overlayViewHost = new OverlayViewHost(document);
        this.overlayPositionHost = new OverlayPositionHost();
    }

    @Input() conditional: Observable<boolean>;

    @Input() set annotation(value: string) {
        if (value === "email")
            this.annotationFunc = emailValidator();
    }

    @Input() onBlurValidation: boolean = true;

    @Input('rxMessage') set message(value: string) {
        if (value) {
            this.placeHolderMessage = value;
            this.removeTooltip();
            this.createTooltip('');
            this.timeOutId = window.setTimeout(() => {
                this.removeTooltip();
            }, 1200)
        }

    }

    @Input('formControlName') set controlName(value: string) {
        this.currentFormControlName = value;
    }


    @HostListener(FOCUS_EVENT, [TARGET_ELEMENT_VALUE])
    onFocusIn(value: any) {
        // if (!this.formControl.dirty && value == "")
        //     this.showPlaceholder();
    };

    @HostListener(BLUR_EVENT)
    onBlur() {
        if (this.onBlurValidation) {
            if (this.statusType === "VALID") 
                this.removeTooltip();
            else if (this.statusType === "INVALID") 
                this.createTooltip('');
        }
        else {
            if (this.componentView)
                this.removeTooltip();
        }
    }

    ngOnInit(): void {
        if (this.conditional)
            this.conditional.subscribe(t => {
                this.isControlRequired = t
                this.formControl.updateValueAndValidity();
            });
    }

    private getLabelText(element?: Element): string {
        if (this.placeHolderMessage)
            return this.placeHolderMessage;
        var previousElement = this.element.parentElement.previousElementSibling;
        if (previousElement && previousElement.nodeName === "LABEL") {
            return previousElement.innerHTML;
        } else {
            previousElement = this.element.parentElement.previousElementSibling.previousElementSibling;
            for (var i = 0; i < 3; i++) {
                if (previousElement && previousElement.nodeName === "LABEL") {
                    return previousElement.innerHTML;
                }
                previousElement = previousElement.previousElementSibling;
            }
        }
        return '';
    }
    private getControlName() {
        let controlName: string = '';
        switch (this.element.nodeName) {
            case 'INPUT':
                controlName = this.element.type.toLowerCase();
                break;
            case 'SELECT':
                controlName = this.element.nodeName.toLowerCase();
                break;
            case 'TEXTAREA':
                controlName = this.element.nodeName.toLowerCase();
                break;
        }
        return controlName;

    }


    private showPlaceholder(): void {
        let labelText = this.getLabelText();
        if (!this.placeHolderMessage)
            this.placeHolderMessage = `${ApplicationConfiguration.get("placeholder." + this.getControlName())} '${labelText}'`;
        this.createTooltip('tooltip-message-placeholder');
    }

    private createTooltip(cssClass: string) {
        this.setOverlay(cssClass);
        if (this.timeOutId)
            window.clearTimeout(this.timeOutId);
        this.timeOutId = window.setTimeout(() => {
            this.showTip();
        }, 2)

    }

    private setOverlay(cssClass: string) {
        var tipElement = this.createTipComponent();
        if (cssClass !== '')
            this.overlayViewHost.createElement(['tooltip', "tooltip-message", cssClass, 'top', this.currentFormControlName]);
        else
            this.overlayViewHost.createElement(['tooltip', "tooltip-message", 'top', this.currentFormControlName]);
        this.overlayViewHost.appendChild(tipElement);
    }

    private removeTooltip() {
        if (this.componentView) {
            this.componentView.destroy();
            this.overlayViewHost.destroy();
            this.componentView = undefined;
        }
    }

    private getNativeElement(element: Node): HTMLElement {
        let nativeElement: HTMLElement;
        switch (element.nodeName) {
            case 'RX-DATE':
                nativeElement = <HTMLElement>element.firstChild;
                break;
            default:
                nativeElement = <HTMLElement>element;
        }
        return nativeElement;
    }

    private showTip() {
        let offSetModel = new OffSetModel('top',
            this.overlayPositionHost.getClientRectangle(this.getNativeElement(this.elementRef.nativeElement)),
            this.overlayPositionHost.getOffset(this.getNativeElement(this.elementRef.nativeElement)),
            this.overlayPositionHost.getOffset(this.overlayViewHost.element));
        var calculatedOffset = this.overlayPositionHost.getCalculatedOffset(offSetModel);
        this.overlayViewHost.applyPlacement(calculatedOffset);
        this.overlayViewHost.addClass("show");
        if (this.timeOutId)
            window.clearTimeout(this.timeOutId);
        this.timeOutId = window.setTimeout(() => {
            this.removeTooltip();
        }, 1000)
    }

    private createTipComponent(): HTMLElement {
        this.componentView = new ComponentView<RxMessageComponent>(RxMessageComponent, this.viewContainerRef, this.componentFactoryResolver);
        this.componentView.create({ 'tipMessage': this.placeHolderMessage });
        return this.componentView.rootNode();
    }
    private defaultMessage(error: string, errorObject: any) {
        var errorMessage = ApplicationConfiguration.get("validation.message.default." + error);
        switch (error) {
            case "maxlength":
                this.placeHolderMessage = errorMessage.replace("#n#", errorObject.requiredLength);
                break;
            case "minlength":
                this.placeHolderMessage = errorMessage.replace("#n#", errorObject.requiredLength);
                break;
            case "contains":
                this.placeHolderMessage = errorMessage.replace("#value#", errorObject);
                break;
            case "maxNumber":
                this.placeHolderMessage = errorMessage.replace("#n#", errorObject.maxNumber);
                break;
            case "max":
                this.placeHolderMessage = errorMessage.replace("#n#", errorObject.max);
                break;
            case "compare":
                let labelText = this.getLabelText();
                this.placeHolderMessage = errorMessage.replace('#field1#', labelText).replace('#field2#', errorObject.controlLabel);
                break;
            case "required":
                if (errorObject.message) {
                    this.placeHolderMessage = errorObject.message;
                    break;
                }
            default:
                this.placeHolderMessage = errorMessage;
        }
    }
    statusChange(statusType: string, formControl: FormControl): void {
        if (statusType === "VALID") {
            this.removeTooltip();
        } else {
            for (var error in formControl.errors) {
                this.removeTooltip();
                if (error != "custom") {
                    if (error == "required") {
                        this.defaultMessage(error, formControl.errors[error]);
                    } else
                        this.defaultMessage(error, formControl.errors[error]);
                    if (!this.onBlurValidation) {
                        this.createTooltip('');
                    }
                    break;
                }
            }
            return;
        }
    }

    validate(formControl: FormControl): boolean {
        if (!this.isSubscribed) {
            this.formControl = formControl;
            if (this.conditional)
                formControl.setValidators(this.validationControl(this));
            formControl.statusChanges.subscribe(v => this.statusChange(this.statusType = v, formControl));
            this.isSubscribed = true;
        }
        return false;

    }

    validationControl(jObject: any): ValidatorFn {
        let isControlRequired = false;
        if (jObject.conditional)
            jObject.conditional.subscribe(t => {
                jObject.isControlRequired = t
                jObject.formControl.updateValueAndValidity();
            });
        return (formControl: AbstractControl): { [key: string]: any } => {
            if (jObject.annotationFunc) {
                let result = jObject.annotationFunc(formControl);
                if (result)
                    return result;
            }
            if (jObject.isControlRequired && (formControl.value === undefined || formControl.value === null || formControl.value === "null" || formControl.value === '')) {
                return { 'required': '' };
            }
            if (typeof formControl.value === "string" && formControl.value.trim() === "")
                return { 'required': '' };
            return
        }
    }

    destroyElement(): void {
        this.astrickSpanElement.remove();
        this.messageSpanElement.remove();
        this.astrickSpanElement = null;
        this.messageSpanElement = null;
        this.parentNodeElement = null;
    }

    ngOnDestroy() {
        if (this.conditionalSubscription)
            this.conditionalSubscription.unsubscribe();
        if (this.controlSubscription)
            this.controlSubscription.unsubscribe();
        if (this.componentView)
            this.removeTooltip();
    }
}
