import { ComponentInstanceConfig } from "../interfaces/component-instance-config";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthorizeConfig } from '../interfaces/authorize-config'
export const componentInstanceProvider:
    {
        add(name: string, resolver: Function, paramChanged: (params: { [key: string]: any }) => void, queryParamChanged: (queryParams: { [key: string]: any }) => void),
        resolve(target: Function),
        dispose(target: Function)
        setComponentRoute(route: ActivatedRouteSnapshot,router:Router);
        getActivatedRouteSnapshot(): ActivatedRouteSnapshot;
        getRouter(): Router;
        getResult(): { activatedRouteSnapshot: ActivatedRouteSnapshot, router: Router, authorizeConfig: AuthorizeConfig },
        setAuthroizeConfig(config: AuthorizeConfig),
        getAuthorizeConfig() 
    } = new (class {
        instances: Array<ComponentInstanceConfig> = new Array<ComponentInstanceConfig>();
        activatedRouteSnapshot: ActivatedRouteSnapshot;
        router: Router;
        authorizeConfig:AuthorizeConfig
        broadCastParamChange(params: { [key: string]: any }) {
            if (Object.keys(params).length > 0)
            this.instances.forEach(t => {
                t.paramChanged(params);
            })
        }

        broadCastQueryParamChange(queryParams: { [key: string]: any }) {
            if (Object.keys(queryParams).length > 0)
                this.instances.forEach(t => {
                    t.queryParamChanged(queryParams);
                })
        }

        setComponentRoute(route: ActivatedRouteSnapshot,router:Router) {
            this.activatedRouteSnapshot = route;
            this.router = router;
            this.broadCastParamChange(route.params);
            this.broadCastQueryParamChange(route.queryParams);
        }

        setAuthroizeConfig(config: AuthorizeConfig) {
            this.authorizeConfig = config;
        }

        getAuthorizeConfig() {
            return this.authorizeConfig;
        }

        getResult() {
            return {
                activatedRouteSnapshot: this.activatedRouteSnapshot,
                router: this.router,
                authorizeConfig: this.authorizeConfig
            }
        }

        getActivatedRouteSnapshot() {
            return this.activatedRouteSnapshot;
        }

        getRouter() {
            return this.router;
        }

        add(name: string, resolver: Function, paramChanged: (params: { [key: string]: any }) => void, queryParamChanged: (queryParams: { [key: string]: any }) => void) {
            this.instances.push({ name: name, resolver: resolver, paramChanged: paramChanged, queryParamChanged: queryParamChanged });
        }

        resolve(target: Function) {
            let instance = this.instances.filter(t => t.name == target.name)[0];
            if (instance)
                return instance.resolver();
            throw new Error("Component instance is not available");
        }

        dispose(target: Function) {
            let instances = this.instances.filter(t => t.name == target.name);
            let length = instances.length;
            for (var i = 0; i < length; i++)
                instances.splice(0, 1);
        }
    })();
