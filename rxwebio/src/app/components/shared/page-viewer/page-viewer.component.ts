import { ViewContainerRef, Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { AppCodeComponent } from '../app-code/app-code.component'
import { ComponentView } from '../../../domain/view'

import { AppExampleRunnerComponent } from "src/app/components/shared/app-example-runner/app-example-runner.component";
import { AppTabsComponent } from "src/app/components/shared/app-tabs/app-tabs.component";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { BaseComponentProvider } from "src/app/components/shared/base.component";
import { GitHubIssueComponent } from "src/app/components/shared/disqus/github-issue/github-issue.component";
import { DisqusComponent } from "src/app/components/shared/disqus/disqus/disqus.component";
import { ContributionComponent } from '../disqus/contribution/contribution.component';
@Component({
    selector: 'page-viewer',
    templateUrl: './page-viewer.component.html',
}) 

export class PageViewerComponent extends BaseComponentProvider implements OnInit {
    @Input() content: string;
    @Input() showExample?: boolean =true;
    constructor(
        private elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef,
        @Inject(COMPONENT_EXAMPLE) exampleComponents: { [key: string]: any },
    ) {
        super(viewContainerRef, componentFactoryResolver, exampleComponents);
        this.element = elementRef.nativeElement as HTMLElement;
    }
    ngOnInit(): void {
        this.element.innerHTML = this.content;
        let elements = this.element.querySelectorAll("[component]");
        let allElements = this.element.querySelectorAll("[class*='showHideElement']");
        Array.prototype.slice.call(allElements).forEach((element: HTMLDivElement) => {
            if (this.showExample) {
                element.classList.add('showElement');
                element.classList.remove('hideElement');
            }
            else {
                element.classList.remove('showElement');
                element.classList.add('hideElement');
            }
        });
        Array.prototype.slice.call(elements).forEach((element: HTMLDivElement) => {
            let componentName = element.getAttribute("component");
            var params = this.getParams(element, componentName);
            switch (componentName) {
                     case "app-code":
                    element.appendChild(this.create(AppCodeComponent, params).rootNode());
                    break;
                case "app-example-runner":
                    element.appendChild(this.create(AppExampleRunnerComponent, params).rootNode());
                    break;
                case "app-tabs":
                    element.appendChild(this.create(AppTabsComponent, params).rootNode());
                    break;
                case "app-github-issue":
                    element.appendChild(this.create(GitHubIssueComponent, {}).rootNode());
                    break;
                case "app-contribution":
                    element.appendChild(this.create(ContributionComponent, {}).rootNode());
                    break;

            }
        })
    }
    scrollTo(section) {
        location.hash = section;
        return false;
    }
}

