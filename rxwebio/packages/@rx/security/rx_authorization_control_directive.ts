import { Directive,  ContentChildren, AfterContentInit, ElementRef, QueryList, Input, ViewContainerRef} from "@angular/core";
import { user } from "./";
import { ApplicationConfiguration, ApplicationBroadcaster } from "../core"


@Directive({ selector: '[rxAuth]' })
export class RxAuthDirective {
  element: Node;
  items: any[];
  constructor(private _viewContainer: ViewContainerRef, elementRef: ElementRef) {
    this.element = elementRef.nativeElement as Node;
  }

  @Input('rxAuth') set permissionItem(module: any[]) {
    this.items = module;
  }

  check(module: any): boolean {
    let currentItem;
    let isAllow: boolean;
    for (let item of this.items) {
      if (!currentItem)
        currentItem = module[item];
      else
        currentItem = currentItem[item];
      isAllow = currentItem;
    }
    return isAllow;
  }

  remove(): void {
    let parentElement = this.getParentElement();
    parentElement.removeChild(this.element);
  }
  private getParentElement(): Node {
    return this.element.parentNode;
  }
}
@Directive({ selector: '[rxPermissionItem]' })
export class RxPermissionItemDirective {
    element: Node;
    items: any[];
    constructor(private _viewContainer: ViewContainerRef, elementRef: ElementRef) {
        this.element = elementRef.nativeElement as Node;
    }

    @Input('rxPermissionItem') set permissionItem(module: any[]) {
        this.items = module;
    }

    check(module: any): boolean {
        let currentItem;
        let isAllow: boolean;
        for (let item of this.items) {
            if (!currentItem)
                currentItem = module[item];
            else
                currentItem = currentItem[item];
            isAllow = currentItem;
            if (!isAllow)
              break;
        }
        return isAllow;
    }

    remove(): void {
        let parentElement = this.getParentElement();
        parentElement.removeChild(this.element);
    }
    private getParentElement(): Node {
        return this.element.parentNode;
    }
}

@Directive({ selector: '[rxPermission]' })
export class RxPermissionDirective  {
  @ContentChildren(RxPermissionItemDirective) private permissionItems: QueryList<RxPermissionItemDirective>;
  @ContentChildren(RxAuthDirective) private authItems: QueryList<RxAuthDirective>;
    element: Node;
    moduleId: string;
    constructor(private viewContainer: ViewContainerRef, elementRef: ElementRef) {
        this.element = elementRef.nativeElement as Node;
    }

    @Input('rxPermission') set permission(module: string) {
        this.moduleId = module;
    }

    check(module: any): boolean {
      var removeCount = 0;
      var authRemoveCount = 0;
        if (module[this.moduleId]) {
            this.permissionItems.forEach(t => {
                if (!t.check(module[this.moduleId])) {
                    t.remove();
                    removeCount++;
                }
          })
            if (this.authItems)
              this.authItems.forEach(t => {
                if (!t.check(user.authorizationPermissionItem)) {
                  authRemoveCount++;
                  t.remove();
                }
              })
        } else {
            return false;
      }
        if (this.authItems.length == 0)
          return removeCount !== this.permissionItems.length;
        else
          return (authRemoveCount !== this.authItems.length) && (removeCount !== this.permissionItems.length);
    }

    remove(): void {
        let parentElement = this.getParentElement();
        parentElement.removeChild(this.element);
    }
    private getParentElement(): Node {
        return this.element.parentNode;
    }
}

@Directive({ selector: '[rxAuthorization]' })
export class RxAuthorizationDirective implements AfterContentInit {
  @ContentChildren(RxPermissionDirective) private permissions: QueryList<RxPermissionDirective>;
  @ContentChildren(RxAuthDirective) private authItems: QueryList<RxAuthDirective>;
    remove: boolean;
    element: Node;
    securityModule: any;
    minutes: number;
    isProcessed: boolean = false;
    constructor(private _viewContainer: ViewContainerRef, elementRef: ElementRef, applicationBroadcaster: ApplicationBroadcaster) {
        this.element = elementRef.nativeElement as Node;
        applicationBroadcaster.configurationSubscriber.subscribe(t => {
            this.minutes = ApplicationConfiguration.get("authorization").cacheMinutes;
        });
        
    }

    ngAfterContentInit(): void {
      if (user.authorizationPermissionItem)
        this.checkPermissions(user.authorizationPermissionItem);
    }

    checkPermissions(module: any) {
      if (!this.isProcessed) {
        if (this.permissions) {
          var removeCount = 0;
          var authRemoveCount = 0;
          this.permissions.forEach(t => {
            if (!t.check(module)) {
              t.remove();
              removeCount++;
            }
          });
          if (this.authItems) {
            this.authItems.forEach(t => {
              if (!t.check(user.authorizationPermissionItem)) {
                t.remove();
                authRemoveCount++;
              }
            })
          }
          if (removeCount === this.permissions.length) {
            if (authRemoveCount == this.authItems.length) {
              let parentElement = this.getParentElement();
              parentElement.removeChild(this.element);
            }
          }
        } else {
          this.securityModule = module
        }
        this.isProcessed = true;
      }
    }

    private getParentElement(): Node {
        return this.element.parentNode;
    }

    getDate(): Date {
        let now = new Date();
        return new Date(now.getTime() + this.minutes * 60000)
    }
}
