import { Injectable } from '@angular/core';
import { IAuthorize, AuthorizeConfig } from '@rxweb/angular-router';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RxHttp } from '@rxweb/http';

export var dbAccessModule: any;

@Injectable({
    providedIn: 'root',
})
export class AuthorizationResolver implements IAuthorize {

    constructor(private http: RxHttp, private router: Router) { }

    // For retrieving the access of the application module to user for the parent module 
    authorize(authorizeConfig: AuthorizeConfig, route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
        var promise = new Promise<boolean>((resolve, reject) => {
            if (dbAccessModule == undefined || dbAccessModule == null) {
                this.http.get<string>({ path: "assets/json/users-access.json", }).subscribe(response => {

                    dbAccessModule = response;
                    let isAccess = this.verifyAuthorization(authorizeConfig);
                    resolve(isAccess);
                    if (!isAccess)
                        this.router.navigate(["/dashboard"])
                })
            }
            else {
                let isAccess = this.verifyAuthorization(authorizeConfig);
                resolve(isAccess);
                if (!isAccess)
                    this.router.navigate(["/dashboard"])
            }

        })
        return promise;
    }

    // To check the access level based upon the application module and the action type
    verifyAuthorization(authorizeConfig: AuthorizeConfig): boolean {
        return dbAccessModule[authorizeConfig.accessLevel][authorizeConfig.action]
    }

    // For retrieving the access of the application module to user for the child module
    authorizeChildren(authorizeConfig: AuthorizeConfig, pageAuthorizeConfig: AuthorizeConfig) {
        debugger
        if (dbAccessModule == undefined || dbAccessModule == null) {
            var promise = new Promise<boolean>((resolve, reject) => {
            this.http.get<string>({ path: "assets/json/users-access.json" }).subscribe(response => {
                debugger
                console.log(response);
                dbAccessModule = JSON.parse(response);
                var result = this.verifyAuthorization(authorizeConfig);
                resolve(result);

            })
        })
        return promise;
        }
        else {
            return this.verifyAuthorization(authorizeConfig);

        }

    }
}
