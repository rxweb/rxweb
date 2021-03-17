import { Injector, Directive,  EmbeddedViewRef, ViewContainerRef, TemplateRef, Input, ElementRef, Inject, OnDestroy } from "@angular/core";
import { NgIfContext } from "@angular/common";
import { translateContainer } from "../core/translate-container";
import { TranslateContainerConfig } from "../interface/translate-container-config";
import { BaseResolver } from "../resolver/base-resolver";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRoute } from "@angular/router";
import { RX_TRANSLATE_CONFIG } from "../core/rx-translate-config.const";
import { HttpClient } from "@angular/common/http";
import { viewRefContainer } from "../core/view-ref-container";
import { Subscription } from "rxjs";
import { translateConfigContainer } from "../core/translate-config-container";

@Directive({
    selector: '[rxTranslate]'
})
export class RxTranslateDirective implements OnDestroy {
    
    private viewRef: EmbeddedViewRef<any> | null = null;
    private _context: NgIfContext = new NgIfContext();
    private config: TranslateContainerConfig;
    private component: any;
    private subscription: Subscription;
    private baseConfig: any;
    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private injector: Injector, @Inject(RX_TRANSLATE_CONFIG) baseConfig: RxTranslateConfig, private route: ActivatedRoute, private httpClient: HttpClient) {
        let ref: any = this.templateRef;
        this.baseConfig = translateConfigContainer.config.forNgxTranslate ? translateConfigContainer.config : baseConfig;
        let elementName = null;
        if (ref._def) {
            elementName = ref._def.element.template.nodes[0].element.name
            let node = ref._def.element.template.nodes[ref._def.element.template.nodes.length - 1];
            this.component = node.provider.token;
            this.config = translateContainer.get(node.provider.token);
        } else if (ref._declarationTContainer) {
            let tagName = ref._declarationTContainer.tagName;
            elementName = tagName.toLowerCase();
            let tView = ref._declarationTContainer.tView_ || ref._declarationTContainer.tViews;
            let node = tView.directiveRegistry.filter(t => t.selectors.filter(y => y == tagName)[0] != undefined)[0];
            if (node) {
                this.config = translateContainer.get(node.type);
                this.component = node.type;
            }
        }
        if (baseConfig.forNgxTranslate && this.component && elementName)
            translateContainer.setComponentState(elementName, this.component);
    }

    @Input('rxTranslate') set translate(value: any) {
        if (this.config)
        {
            let baseResolver = new BaseResolver(this.baseConfig, this.httpClient);
            let languageCode = "";
            if (this.route.params && this.route.params["languageCode"] && this.baseConfig.languageCode !== this.route.params["languageCode"] && !this.config.config.language)
                languageCode = this.route.params["languageCode"];
            this.subscription = baseResolver.resolveData(this.config, languageCode).subscribe(x => {
                this.updateView(x);
            });
        }
        else
            this.updateView(true)
    }

    

    private updateView(value: boolean) {
        if (this.viewRef) {
            this.viewContainerRef.clear();
            this.viewRef = null;
        }
        if (value)
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, this._context);
        else
            this.viewContainerRef.clear();
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
        viewRefContainer.destroy(this.component);
    }
}