import {
    Inject,
    Component,
    AfterContentInit,
    OnDestroy,
    QueryList,
    ViewContainerRef,
    ComponentFactoryResolver,
    Input,
    ViewChild,
    ComponentRef,
    ContentChildren
} from "@angular/core"

import { Subscription } from "rxjs/Rx";

import { RxTabComponent } from "./rx_tab_control_component";
import { RxTabContentComponent } from "./rx_tab_content_control_component";
import { RxPopup } from '../popup/popup.service';
import { CanActivate } from "@angular/router"
import { UnAuthorizedAccessComponent } from '../popup/unauthorized-access.component';
import { DynamicComponentContainer, ApplicationPage } from "../../core";
@Component({
    selector: 'rx-tabs',
    templateUrl: "./rx_tabs_control_component.html"
})
export class RxTabsComponent implements AfterContentInit, OnDestroy {
    @ContentChildren(RxTabComponent) tabs: QueryList<RxTabComponent>;
    @ViewChild(RxTabContentComponent, { read: ViewContainerRef }) componentContent: ViewContainerRef;
    staticTabContents: RxTabComponent[];
    @Input() preChange: any;
    tabGroupClass: string;
    anchorTag: string;
    listItem: string;
    tabContentClass: string;
    tabComponentRef: ComponentRef<any>;
    isComponentActive: boolean;
    isPermissionChecked: boolean = false;
    activeTab: any;
    onDemandSubscription: Subscription;
    constructor(public viewContainerRef: ViewContainerRef,
        public componentFactoryResolver: ComponentFactoryResolver,
        @Inject('PageAccess') private pageAccess: any,
        private popupService: RxPopup) { }

    @Input() activeOnDemand: boolean;

    @Input() set tabClass(value: string) {
        this.tabGroupClass = value;
    }

    @Input() set listItemClass(value: string) {
      this.listItem = value;
    }

    @Input() set anchorTagClass(value: string) {
      this.anchorTag = value;
    }

    @Input() set contentClass(value: string) {
        this.tabContentClass = value;
    }

    ngAfterContentInit(): void {
        this.staticTabContents = this.tabs.toArray().filter(t => t.static);
        this.onDemandSubscription = this.tabs.changes.subscribe(t => {
            if (this.activeOnDemand) {
                let activeTab = this.tabs.toArray().filter(t => t.active)[0];
                if (activeTab) {
                    this.tabSelect(activeTab);
                }
                this.activeOnDemand = false;
            }
            
        })
    }

    tabSelectClick(tab: RxTabComponent, isExecuteEvent: boolean = false): void {
        var isChanged = true;
        if (this.preChange) {
            isChanged = false;
            let preChangeResponse:any = this.preChange(this.activeTab, tab);
            if (typeof preChangeResponse == "boolean")
                isChanged = preChangeResponse;
            else
                preChangeResponse.then(t => {
                    if (t)
                        this.tabSelect(tab, isExecuteEvent)
                })
        }
        if (isChanged)
            this.tabSelect(tab, isExecuteEvent)
    }

    tabSelect(tab: RxTabComponent, isExecuteEvent: boolean = false): void {
        var getComponent = DynamicComponentContainer.get(tab.component);
        if (getComponent != undefined) {
            var state: any = {};
            var route: any = { data: getComponent };
            let accessPromise = <Promise<any>>this.pageAccess.canActivate(route, state)
            accessPromise.then((result) => {
                this.isPermissionChecked = true;
                if (result) {
                    if (isExecuteEvent)
                        tab.tabSelect(this.tabs.toArray().indexOf(tab))
                    this.showTab(tab);
                }
                else
                    this.popupService.show(UnAuthorizedAccessComponent);
            });
        } else {
            if (isExecuteEvent)
                tab.tabSelect(this.tabs.toArray().indexOf(tab))
            this.showTab(tab);
        }
        

    }

    private showTab(tab: RxTabComponent): void {
        this.setActiveTab(tab);
        this.detach();
        if (!tab.static) {
            let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.component);
            this.tabComponentRef = this.componentContent.createComponent(dialogComponentFactory, this.componentContent.length, this.componentContent.parentInjector);
            if (tab.data) {
                for (var col in tab.data) {
                    this.tabComponentRef.instance[col] = tab.data[col]
                }
            }
            this.isComponentActive = true;
        }
    }

    setActiveTab(tab: RxTabComponent): void {
        this.tabs.toArray().forEach(item => {
            if (item !== tab) {
                item.active = false;
            }
        });
        tab.active = true;
        this.activeTab = tab;
    }


    detach(): void {
        if (this.isPermissionChecked)
            ApplicationPage.removeLast(), this.isPermissionChecked = false;
        if (this.tabComponentRef !== undefined) {
            this.tabComponentRef.destroy();
            this.tabComponentRef = undefined;
            this.isComponentActive = false;
        }
      
    }
    ngOnDestroy(): void {
        this.detach();
        this.onDemandSubscription.unsubscribe();
        this.onDemandSubscription = undefined;
    }
}
