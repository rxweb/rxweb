import { Injector, Directive,  EmbeddedViewRef, ViewContainerRef, TemplateRef, Input, ElementRef, Inject } from "@angular/core";
import { NgIfContext } from "@angular/common";
import { translateContainer } from "../core/translate-container";
import { TranslateContainerConfig } from "../interface/translate-container-config";
import { BaseResolver } from "../resolver/base-resolver";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { ActivatedRoute } from "@angular/router";

@Directive({
    selector: '[rxTranslate]'
})
export class RxTranslateDirective {
    private viewRef: EmbeddedViewRef<any> | null = null;
    private _context: NgIfContext = new NgIfContext();
    private config: TranslateContainerConfig;

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private injector: Injector, @Inject("config") private baseConfig: RxTranslateConfig, private route: ActivatedRoute) {
        let ref: any = this.templateRef;
        let node = ref._def.element.template.nodes[ref._def.element.template.nodes.length - 1];
        this.config = translateContainer.get(node.provider.token);
    }

    @Input('rxTranslate') set translate(value: any) {
        if (this.config)
        {
            let baseResolver = new BaseResolver(this.baseConfig);
            let languageCode = "";
            if (this.route.params && this.route.params["languageCode"] && this.baseConfig.languageCode !== this.route.params["languageCode"] && !this.config.config.language)
                languageCode = this.route.params["languageCode"];
            baseResolver.resolve(this.config,languageCode).then(x => {
                this.updateView(x);
            })
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
}