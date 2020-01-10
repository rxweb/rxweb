import { OnDestroy, Type } from "@angular/core";
import { Router, UrlTree, NavigationExtras } from "@angular/router";
import { RxHttp } from "@rxweb/http"
import { ClientDataStorage } from "@rxweb/storage"
import { componentInstanceProvider } from "./component-instance-provider";
import { routeContainer } from "./route-container";
import { AuthorizeConfig } from '../interfaces/authorize-config'
import { ExtendNavigationExtras } from "../interfaces/extend-navigation-extras";
import { encoder } from "../core/encoder";

export abstract class CoreComponent extends RxHttp implements OnDestroy {

    user: { [key: string]: any };
    params: { [key: string]: any };
    queryParams: { [key: string]: any };
    data: any;
    storage: ClientDataStorage;
    parentAuthorizeConfig: AuthorizeConfig;
    authorizeConfig: AuthorizeConfig
    private router: Router;

    onQueryParamsChanged() { }
    onParamsChanged() { }


    constructor() {
        super();
        let result = componentInstanceProvider.getResult();
        if (result && result.activatedRouteSnapshot) {
            this.params = result.activatedRouteSnapshot.params;
            this.queryParams = result.activatedRouteSnapshot.queryParams;
            this.router = result.router;
            this.user = routeContainer.getUser();
            this.data = result.activatedRouteSnapshot.data;
            this.storage = new ClientDataStorage();
            this.parentAuthorizeConfig = result.authorizeConfig;
            let decoratorConfig = routeContainer.getModelDecorator(this.constructor as Function, "access")
            if (decoratorConfig)
                this.authorizeConfig = decoratorConfig.functions;
            componentInstanceProvider.add(this.constructor.name, this.instanceProvider.bind(this), this.paramsChange.bind(this), this.queryParamsChange.bind(this));
        }
    }

    private instanceProvider() {
        return this;
    }

    resolve<T>(component: Type<T>): T {
        return componentInstanceProvider.resolve(component.constructor);
    }


    navigate(commands: any[], extras?: ExtendNavigationExtras): Promise<boolean> {
        return this.router.navigate(commands.concat(this.getParsedParams(extras)), extras);
    }

    ngOnDestroy(): void {
        componentInstanceProvider.dispose(this.constructor);
    }

    private paramsChange(params: { [key: string]: any }) {
        this.params = params;
        this.onParamsChanged();
    }

    private queryParamsChange(queryParams: { [key: string]: any }) {
        this.queryParams = queryParams;
        this.onQueryParamsChanged();
    }

    private getParsedParams(extras: ExtendNavigationExtras) {
        let params = []
        if (extras && extras.params) {
            var isEncryption = routeContainer.get().urlEncryption;
            extras.params.forEach(t => {
                let encode = isEncryption ? encoder.encode(t) : t;
                params.push(encode);
            })
        }
        return params
    }
}