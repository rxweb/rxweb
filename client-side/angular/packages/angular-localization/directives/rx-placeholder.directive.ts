import { ElementRef, Renderer2,Directive, AfterViewInit, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { PlaceholderDirective } from "@rxweb/localization"

@Directive({
    selector: '[rxPlaceholder]',
})
export class RxPlaceholderDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxPlaceholder') name: string;

    private placeholderDirective: PlaceholderDirective;
    constructor(renderer: Renderer2, elementRef: ElementRef,viewContainerRef:ViewContainerRef) {
        super(renderer, elementRef, viewContainerRef)
    }
    ngAfterViewInit(): void {
        if (this.component == null) {	
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
                this.placeholderDirective = new PlaceholderDirective(this.element, this.name, component != null ? component.constructor : null);	
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
                    if(!this.element.isPopulated) this.placeholderDirective = new PlaceholderDirective(this.element, this.name, component != null ? component.constructor : null);	
                }	
        } else{
            if(!this.element.isPopulated){
                this.placeholderDirective = new PlaceholderDirective(this.element, this.name, this.component);
                
            }
        }
        if(!this.element.isPopulated)
            this.placeholderDirective.bind();
    }

    ngOnDestroy(): void {
        this.placeholderDirective.destroy();
    }
}