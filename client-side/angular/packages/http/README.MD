[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

@rxweb/http is used to interact with backend server APIs, it is beneficial to all the client side frameworks having typescript. It is model driven approach of Rxhttp requests

> You dont need to register any module in app module after installation.

* [Register HttpClientConfig](register-httpclientconfig)
* [How To Use](how-to-use)
* [http methods](http-methods)
* [Decorators](decorators)
* [Filters](filters)

## Register HttpClientConfig
Register HttpClientConfig globally in app component. It is used to configure Client configuration properties throughout the application through which the interaction of request is done.

Through HttpClientConfig you can configure
hostURIs for setting the server side uri
In hostUri you need to configure

(1) name of the server

(2) setting default endpoint true if the name is not mentioned

(3) uri of the server

apply filters for onRequest and onResponse
(1) onRequest filter is used to perform some specific action before the request is sent to the server.

(2) onResponse filter is used to perform some specific action after the response is fetch from the server.

perform errorHandling while sending request to server through onError

```js
 HttpClientConfig.register({
            hostURIs: [{
                name: 'local',
                default: true,
                uri: 'http://localhost:3005'
            }],
            filters: [],
            onError: (r) => { console.log(r) },
            isProductionEnvironment: false
        })
```

## How to use
(1) Create a model class and extend it from RxHttp

(2) Set @http decorator on the class


(3) In http decorator you need to mention your hostKey which is the name of the server mentioned in httpClientConfig and path is the path of the specified controller or the path of the data to be accessed.

```js
import { RxHttp,http } from "@rxweb/http";

@http({
    hostKey: "local",
    path: "api/values",
})
export class BaseComponent extends RxHttp {

}
```
## Decorators
(1) @http decorator is used to configure the host name and the path of the server api on which you want to make request from the component.

(2) inMemory
If you want to perform http methods like get, post etc on the data through your client side application instead of server side application, then you can use @inMemory decorator of RxHttp.
```js
import { RxHttp, http, inMemory } from "@rxweb/http";

export class BaseComponent extends RxHttp {

}
@http({
    hostKey: "local",
    path: "api/values",
})
@inMemory()
export class AppDomain extends BaseComponent {
}
```
## http methods
(1) get
You can use get() of RxHttp to request data and get the response in any of the format you want (for example: 'json') by setting the config in your component.

```js
Get() {
        this.get({}).subscribe(res => {
            this.result = res as UserInfo[];
            console.log(res);
        })
    }
```

(2) post
You can use post() of RxHttp to send new data to the server and get the response in any of the format you want (for example: 'json') by setting the config in your component.

```js
Post() {
        this.post({ params: [], body: { firstName: "Srishti", lastName: 'Khandelwal' } }).subscribe(res => {
            this.result = res as UserInfo[];
            console.log(res);
        })
    }
```

(3) patch
The patch method of RxHttp is used for making partial changes to an existing resource by setting the config in your component.

```js
Patch() {
        this.patch({ params: [1], body: { firstName: "Srishti", } }).subscribe(res => {
            
            this.result = res as UserInfo[];
            console.log(res);
        })
    }
```

(4) put
You can use put() of RxHttp to update an existing data to the server and get the response in any of the format you want (for example: 'json') by setting the config in your component.

```js
Put() {
        this.put({ params: [1], body: { firstName: "Srishti", lastName: 'Khandelwal' } }).subscribe(res => {
            this.result = res as UserInfo[];
            console.log(res);
        })
    }
```

(5) delete
You can use delete() of RxHttp to delete an existing data to the server and get the response in any of the format you want (for example: 'json') by setting the config in your component.

```js
Delete() {
        this.delete({ params: [1], body: { id: 2, firstName: "Ushmi", lastName: 'Dave' } }).subscribe(res => {
            this.result = res as UserInfo[];
            console.log(res);
        })
    }
```

## Filters
(1) xhrContext
If you want to set config object including any arguments or model to pass while making XHR calls (i.e. using XMLHttpRequest), you can do it with the help of @xhrFilter decorator of RxHttp.

```js
import {XhrContext, HttpResponse,ResponseFilter,AbstractRequestFilter } from "@rxweb/http"

export class Logging extends AbstractRequestFilter implements ResponseFilter {
    private _startTime: Date;

    onRequest = (context: XhrContext) => {
        this._startTime = new Date();
        this.onRequestExecuting(context);
    }



    onResponse = (response: HttpResponse) => {
        return response;
    }
}
```


