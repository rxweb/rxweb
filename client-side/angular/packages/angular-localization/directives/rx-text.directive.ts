import { ElementRef, Renderer2,Directive, AfterViewInit, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { TextDirective } from "@rxweb/localization"

@Directive({
    selector: '[rxText]',
})
export class RxTextDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxText') name: string;

    @Input() text: string;

    constructor(renderer: Renderer2, elementRef: ElementRef, viewContainerRef: ViewContainerRef) {
        super(renderer, elementRef, viewContainerRef)
    }


    private textDirective: TextDirective;

    ngAfterViewInit(): void {
        if (this.component == null && this.elementRef.nativeElement.componentName == undefined) {	
            var componentViewIndex = -1;	
            var component = null;	
            var element = this.element;	
            var FindTry = 1;	
            var componentId = this.elementRef.nativeElement.getAttribute('component-id');	
            if (componentId == null || componentId == '') {	
                componentId = this.name.split('_')[0]	
            }	
            componentViewIndex = -1;	
            if (componentId != null && componentId != '') {	
                this.elementRef.nativeElement.__ngContext__.forEach((x, i) => { if (x != null) { if (x.constructor.name.indexOf("LComponentView_" + componentId) > -1) { componentViewIndex = i } } })	
                if (componentViewIndex != -1) {	
                    var componentIndex = -1;	
                    this.elementRef.nativeElement.__ngContext__[componentViewIndex].forEach((x, i) => {	
                        if (x != null) {	
                            if (x.constructor.name == componentId) {	
                                componentIndex = i;	
                            }	
                        }	
                    })	
                    if (componentIndex != -1)	
                        component = this.elementRef.nativeElement.__ngContext__[componentViewIndex][componentIndex];	
                }	
            }	
            if (component != null && !this.element.isPopulated)	
                this.textDirective = new TextDirective({ element: this.element, name: this.name, target: component.constructor });	
            else	
                if (this.element) {	
                    while (component == null) {	
                        componentViewIndex = -1;	
                        if (element && element.parentElement && element.parentElement.__ngContext__) {	
                            element.parentElement.__ngContext__.forEach((x, i) => { if (x != null) { if (x.constructor.name.indexOf("LComponentView_") > -1) { componentViewIndex = i } } })	
                            var component = null;	
                            if (componentViewIndex != -1) {	
                                element.parentElement.__ngContext__[componentViewIndex][0].__ngContext__.forEach(x => {	
                                    for (var item in x) {	
                                        if (item == 'components') {	
                                            if (x[item].constructor.name == 'Array') {	
                                                component = x[item][0]	
                                            }	
                                        }	
                                    }	
                                })	
                            }	
                        }	
                        if (component == null) {	
                            element = element ? element.parentElement : null;	
                            FindTry = FindTry + 1;	
                        }	
                        if (FindTry > 20)	
                            break;	
                    }	
                    if(!this.element.isPopulated) this.textDirective = new TextDirective({ element: this.element, name: this.name, target: component != null ? component.constructor : null });	
                }	
        }	
        else
        if(!this.element.isPopulated)this.textDirective = new TextDirective({ element: this.element, name: this.name, target: this.component,text:this.text });
        if(!this.element.isPopulated)this.textDirective?.bind();
    }

    ngOnDestroy(): void {
        if (this.textDirective)
        this.textDirective.destroy();
    }
}