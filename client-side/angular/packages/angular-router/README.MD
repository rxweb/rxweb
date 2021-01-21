[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

<h2>A single package to manage routes, middlewares, access, authenticity and Url encryption in an intuitive and segreated way.</h2>

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

# Authentication
The authentication parameter will be provided a global AuthResolver class which will resolve the user object whenever the user will log in after that the user object will be available to the component whenever the route navigation takes place even if the page is refreshed, There is no need to store this in local storage which provides better security which is implemented using the following steps. 

## Step 1: 
Constructing The Global Authentication resolver: 

```js
export class AuthResolver implements IAuthResolver {

  resolveAuth() {
    // Wite the custom logic here..
     ...
  }
}
```

## Step 2:
Declaring it using `@routerModule` in the root module: 

```js
@routerModule({
    authentication: AuthResolver
  })
@NgModule({...})
export class AppModule { }
```

# Authorization
The authorization class is used for performing role based authorization based upon the user logged-in the client application, The access is provided after the resolved object is obtained are categorized into three ways(Page level access, component level access, control level access) 

Retrieving the user access object is done based upon the application module and the action type. This is resolved globally whenever the navigation takes place throughout the application using `Authorize` function. 

## Step 1 :
Constructing the global Authorization Resolver
```js
export class AuthorizationResolver implements IAuthorize {

  authorize(authorizeConfig: AuthorizeConfig,
    route: ActivatedRouteSnapshot
  ): Promise<boolean> | boolean {
    // Wite the custom logic here..
    ....
  }
}
```

## Step 2:
Declaring it using `@routerModule` in the root module:

```js
@routerModule({
    authorization: AuthorizationResolver
  })
@NgModule({...})
export class AppModule { }
```

## Step 3 :
Setting access on the component using `@access`:

```js
@access({accessLevel:1,action:'get'})
export class CandidateComponent implements OnInit {
 ...
}
```

## Step 4:
Setting up the route:

```js
const ROUTES: Routes = [
    {
        path: '',
        component: CandidateComponent, canActivate: [BaseCanActivate] 
    }
];
```

# Middleware
To invoke some task pre navigation globally whenever any request is made to perform data management and communication in a centralized manner.

## Step 1:
Constructing the global middleware:

```js
export class ConfigurationResolver implements IMiddleware {
  
  invoke(user: { [key: string]: any }) {
    // Wite the custom logic here..
   ...
  }
}
```

## Step 2:
Declaring it using `@routerModule` in the root module:

```js
@routerModule({
    middlewares:[ConfigurationResolver]
  })
@NgModule({...})
export class AppModule { }
```

# *rxAuthorize Directive
Authorizing the shared component and the controls using the `*rxAuthorize` by passing the component name along with the directive, To restrict the control to the unauthorized users in the application using this diecrtive is done as below:

## Step 1:
```ts
<a *rxAuthorize="candidateAvailabilityAdd" (click)="addCandidateAvailability " ><i class="fa fa-plus ml-2"></i></a>
```

@rxweb/angular-router provides mechanism to perform decorator based component specific authorization and invoking component level middleware using decorators [@access](https://docs.rxweb.io/rxweb-router/angular-router/router-authorization#component-level), [@anonymous](https://docs.rxweb.io/rxweb-router/angular-router/router-authentication#scenario) and [@middleware](https://docs.rxweb.io/rxweb-router/angular-router/middleware#component-based)
