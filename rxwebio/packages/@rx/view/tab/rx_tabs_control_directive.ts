import {AfterContentInit, OnDestroy, ContentChildren, QueryList, ViewContainerRef, Inject, ComponentFactoryResolver, Directive, ComponentRef } from "@angular/core";
import {Subscription} from "rxjs/Rx";
import { CanActivate } from "@angular/router"

import {DynamicComponentContainer, ApplicationPage } from "../../core";
import {RxTabDirective } from "./rx_tab_control_directive";
import {RxTabContentDirective} from "./rx_tab_content_control_directive";
import {TabModel} from "./tab.models";
import {RxPopup }  from '../popup/popup.service';
import {UnAuthorizedAccessComponent } from '../popup/unauthorized-access.component';

@Directive({
    selector: '[rxTabs]',
    exportAs: 'tabs'
})
export class RxTabsDirective implements AfterContentInit, OnDestroy {

    @ContentChildren(RxTabDirective) private tabs: QueryList<RxTabDirective>;
    @ContentChildren(RxTabContentDirective, { read: ViewContainerRef }) private rxTabContent: QueryList< ViewContainerRef>;
    private tabSelectionSubscriptions: Subscription[];
    private tabComponentRef: ComponentRef<any>;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject('PageAccess') private pageAccess: any,
        private popupService:RxPopup
    ) {
        this.tabSelectionSubscriptions = new Array<Subscription>();
    }


    ngAfterContentInit() {
        this.tabs.forEach(item => {
            if (item.tab.active)
                this.createComponent(item.tab);
            this.subscribeTabSelection(item);
        }
        );
    }


    updateTab(tabModel: TabModel): boolean {
        this.subscribeTabSelected(tabModel);
        return true;
    }

    private subscribeTabSelection(rxTabDirective: RxTabDirective) {
        var subscription = rxTabDirective.tabSelected.subscribe(tabSelectedObject => this.subscribeTabSelected(tabSelectedObject.tab))
        this.tabSelectionSubscriptions.push(subscription);
    }

    private subscribeTabSelected(tabModel: TabModel): void {
        if (tabModel && tabModel.active) {
            this.tabs.forEach(item => {
                if (item.tab !== tabModel) {
                    item.tab.active = false;
                    item.setActiveClass(false);
                } else {
                    this.createComponent(tabModel);
                }
            });
        }
    }

    private createComponent(tabModel: TabModel): void {
        var getComponent = DynamicComponentContainer.get(tabModel.component);
        if (getComponent != undefined) {
            var state: any = {};
            var route: any = { data: getComponent };
            let accessPromise = <Promise<any>>this.pageAccess.canActivate(route, state)
            if (this.tabComponentRef !== undefined) {
                ApplicationPage.removeLast();
            }
            accessPromise.then((result) => {
                if (result)
                    this.showTab(tabModel);
                else
                    this.popupService.show(UnAuthorizedAccessComponent);
            });
        } else
            this.showTab(tabModel);
        
    }
    private showTab(tabModel: TabModel): void {
        if (this.tabComponentRef !== undefined) {
            this.tabComponentRef.destroy();
            this.tabComponentRef = null;
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(tabModel.component);
        this.tabComponentRef = this.rxTabContent.first.createComponent(componentFactory);
    }

    ngOnDestroy(): void {
        for (let subscription of this.tabSelectionSubscriptions) {
            subscription.unsubscribe();
        }
        this.tabSelectionSubscriptions = null;
    }
}