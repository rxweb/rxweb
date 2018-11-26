import { ViewContainerRef, Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { AppCodeComponent } from '../app-code/app-code.component'
import { ComponentView } from '../../../domain/view'

import { AppExampleRunnerComponent } from "src/app/components/shared/app-example-runner/app-example-runner.component";
import { AppNotesComponent } from "src/app/components/shared/app-notes/app-notes.component";
import { AppTabsComponent } from "src/app/components/shared/app-tabs/app-tabs.component";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { BaseComponentProvider } from "src/app/components/shared/base.component";
@Component({
    selector: 'page-viewer',
    templateUrl: './page-viewer.component.html',
})

export class PageViewerComponent extends BaseComponentProvider implements OnInit {
    @Input() content: string;
    
    constructor(
        private elementRef: ElementRef,  componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef,
        @Inject(COMPONENT_EXAMPLE) exampleComponents: { [key: string]: any },
    ) {
        super(viewContainerRef,componentFactoryResolver,exampleComponents);
        this.element = elementRef.nativeElement as HTMLElement;
    }
    ngOnInit(): void {
        this.element.innerHTML = this.content;
        let elements = this.element.querySelectorAll("[component]");
        Array.prototype.slice.call(elements).forEach((element: HTMLDivElement) => {
            let componentName = element.getAttribute("component");
            var params = this.getPramas(element,componentName);            
            switch (componentName) {
                case "app-code":
                    element.appendChild(this.create(AppCodeComponent,params).rootNode());
                    break;
                case "app-example-runner":
                    element.appendChild(this.create(AppExampleRunnerComponent,params).rootNode());
                    break;
                case "app-note":
                    element.appendChild(this.create(AppNotesComponent,params).rootNode());
                    break;
                case "app-tabs":
                    element.appendChild(this.create(AppTabsComponent,params).rootNode());
                    break;

            }
        })
    }
}

