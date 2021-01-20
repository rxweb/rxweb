[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

<p>A single package to manage routes, middlewares, access, authenticity and Url encryption in an intuitive and segreated way.</p>

<h1>Benefits</h1> 
<ul>
<li>Maintanable and consistent</li>
<li>Seperation of authentication and authorization</li>
<li>Individual component wise access check</li>
<li>Centralized encryption management</li>
<li>One `CanActivate` throughout the application</li>
<li>Single decorator to navigate throughout the application</li>
<li>Allow Anonymous using a single decorator</li>
</ul>

<h1>Install The Package</h1>
<p>Install the package using the below command</p>

> npm install @rxweb/angular-router

<h1>Register The Module</h1>
Register the `RxRoutingModule` in the AppModule as below:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RxRoutingModule } from '@rxweb/angular-router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RxRoutingModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Global Configuration
`@rxweb/angular-router` provides global authorization, authentication and middlewares using decorator @routerModule which is globally declared in the root module of the application which contains the following parameters 

1) Authentication
2) Authorization
3) Middleware

```js
@routerModule({
    authentication: <The Authentication Resolver Method>,
    authorization: <The Authorization Resolver Method>,
    middleware: <The middleware function>
  })
@NgModule({...})
export class AppModule { }
```

## Authentication
The authentication parameter will be provided a global AuthResolver class which will resolve the user object whenever the user will log in after that the user object will be available to the component whenever the route navigation takes place even if the page is refreshed, There is no need to store this in local storage which provides better security 

Here is an example of AuthResolver class which resolves the user object by making request to the server which is placed in the function `resolveAuth`, In this example the user object is resolved from a json file   

```js
import { Injectable } from "@angular/core";
import { IAuthResolver } from "@rxweb/angular-router";
import { HttpClient } from "@angular/common/http";
import { ApplicationObjects } from "./application-objects";

@Injectable({
  providedIn: "root"
})
export class AuthResolver implements IAuthResolver {
  constructor(private http: HttpClient) {}

  resolveAuth(): Promise<{ [key: string]: any }> | { [key: string]: any } {
    var promise = new Promise<{ [key: string]: any }>((resolve, reject) => {
      // Your custom logic here
      if (ApplicationObjects.user == undefined)
        this.http.get("assets/json/user.json").subscribe(response => {
          ApplicationObjects.user = response;
          resolve(response);
        });
    });
    return promise;
  }
}
```

## Authorization
The authorization class is used for performing role based authorization based upon the user logged in in the client application, The access is provided after the resolved object is obtained are categorized into three ways(Page level access, component level access, control level access) 

Retrieving the user access object is done based upon the application module and the action type. This is resolved globally whenever the navigation takes place throughout the application using `Authorize` function. 

In this example the user access object is retrieved from the user access json file, The custom code to resolve the user object from the server is written in the Authorize function:

```js
import { Injectable } from "@angular/core";
import { IAuthorize, AuthorizeConfig } from "@rxweb/angular-router";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";

export var dbAccessModule: any;

@Injectable({
  providedIn: "root"
})
export class AuthorizationResolver implements IAuthorize {
  constructor(private http: HttpClient, private router: Router) {}

  authorize(
    authorizeConfig: AuthorizeConfig,
    route: ActivatedRouteSnapshot
  ): Promise<boolean> | boolean {
    var promise = new Promise<boolean>((resolve, reject) => {
      var t = this;

      if (dbAccessModule == undefined || dbAccessModule == null) {
        //server side api
        this.http
          .get("assets/user-access/user-access.json")
          .subscribe(response => {
            dbAccessModule = response;
            let isAccess = this.verifyAuthorization(authorizeConfig);
            resolve(isAccess);
            if (!isAccess) this.router.navigate(["/dashboard"]);
          });
      } else {
        let isAccess = this.verifyAuthorization(authorizeConfig);
        resolve(isAccess);
        if (!isAccess) this.router.navigate(["/dashboard"]);
      }
    });
    return promise;
  }

  verifyAuthorization(authorizeConfig: AuthorizeConfig): boolean {
    return dbAccessModule[authorizeConfig.accessLevel][authorizeConfig.action];
  }
}
```

## Middleware
Global middleware are used for invoking an action pre-route navigation whenever the particular route is called throughout the application. 

This usage is explained using a case where the configuration of the application is resolved using the global middleware in which the configuration of the application from a configuration json stored in the assets of the application, These configuration store the keys like default language, change detection, default theme, cache keys etc.. which are resolved in a centralized manner.

Lets begin by creating a class `ConfigurationResolver` which implements `IMiddleware` interface to use the invoke method to resolve the configuration.

```js
import { Injectable } from "@angular/core";
import { IMiddleware } from "@rxweb/angular-router";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";

export var configurationData: any;
@Injectable({
  providedIn: "root"
})
export class ConfigurationResolver implements IMiddleware {
  constructor(private http: HttpClient, private router: Router) {}
  invoke(user: { [key: string]: any }) {
    const promise = new Promise<any>((resolve, reject) => {
      if (configurationData == undefined || configurationData == null)
        this.http.get(`/assets/configuration.json`).subscribe(response => {
          resolve(true);
          configurationData = response;
        });
      else resolve(true);
    });
    return promise;
  }
}
```

The `@routerModule` after making these three classes is as below:

```js
@routerModule({
    authentication:AuthResolver,
    authorization: AuthorizationResolver,
    middleware: ConfigurationResolver
  })
@NgModule({...})
export class AppModule { }
```

# Component Specific Access
Component based access is done by following these two steps :

1) `@access` above the component class 
This decorator contains two parameters 
   1) Access level : access level is the application module(application component or unit) on which the authorization should be perfomed
   2) Action : the action type based upon which the authorization is done

```js
@Component({
  selector: "app-candidate",
  templateUrl: "./candidate.component.html"
})
@access({accessLevel:1,action:'get'})
export class CandidateComponent implements OnInit {
 
}
```

2) `BaseCanActive` on the route
Authorization resolution using a single base canActivate throughout the application known as `BaseCanActive` used while registering the route 

```js
const ROUTES: Routes = [
    {
        path: '',
        component: CandidateComponent, canActivate: [BaseCanActivate] 
    }
];

export const ROUTING = RouterModule.forChild(ROUTES);
```

3) `@anonymous` decorator for the components where we want to access the server api without the user object(before the user logs in). For example UserAdd component where the new user needs to be registered.

```js
@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html"
})
@anonymous
export class UserAddComponent implements OnInit {
 
}
```

# *rxAuthorize Directive
Authorizing the shared component and the controls using the `*rxAuthorize` by passing the component name along with the directive

### Shared Component
*rxAuthorize directive in the shared component is used as below :

```Html
<app-candidate-add *rxAuthorize=[candidateAdd]></app-candidate-add>
```

candidateAdd is the component name specified in its component ts


```ts
export class CandidateListComponent implements OnInit {
  candidateAdd: any = CandidateAddComponent;
 
}
```

### Control level Authorization
To restrict the control to the unauthorized users in the application using this diecrtive is done as below:

```ts
<a *rxAuthorize="candidateAvailabilityAdd" (click)="addCandidateAvailability " ><i class="fa fa-plus ml-2"></i></a>
```

# Component Specific Middleware
Adding a component specific middleware using `@middleware` decorator above the component class, It will be invoke whenever the specific component is called 
This is an example of LoggedInMiddleware in which it checks whether the user is logged in or not, If the user is logged in it will redirect it to the users page. 

```js
import { Injectable } from '@angular/core';
import { IMiddleware } from '@rxweb/angular-router'
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorage } from '../../services/browser-storage';

@Injectable({
    providedIn: 'root',
})
export class LoggedInMiddleware implements IMiddleware {
    constructor(private router: Router, private storagedata: BrowserStorage) { }
    invoke(user: { [key: string]: any; }, activateRouteSnapshot: any): boolean | Promise<boolean> {
        var auth = this.storagedata.local.get('auth',false);
        if (auth)
            this.router.navigate(['users']);
        return true;
    }
}
```

Further this class will be mentioned in the @middleware decorator in the component class

```js
// Middleware decorator
@middleware([LoggedInMiddleware])

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit {
    constructor(private router : Router) {
    }

    ngOnInit(): void {
       
    }

    login(): void {
       this.router.navigate(['/dashboard'])
    }
}

```
