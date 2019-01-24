import {Subject, Observable  } from "rxjs/Rx";
import {Local } from '../storage/local.domain'

export class UserPermissionCache {
    constructor(userPermission?: UserPermissionCache) {
        if (userPermission) {
            this.rootModuleId = userPermission.rootModuleId;
            this.permission = userPermission.permission;
            this.requestedDate = userPermission.requestedDate;
            
        }
    }

    rootModuleId: number;
    permission: {};
    requestedDate: Date;
}

export class User {
    private authorizationSubject: Subject<any> = new Subject<any>();
    private localStorage: Local;

    authorizationSubscriber: Observable<any>;

    constructor() {
        this.permissions = new Array<UserPermissionCache>();
        this.currentPermission = new UserPermissionCache();
        this.authorizationSubscriber = this.authorizationSubject.asObservable();
        this.localStorage = new Local();
    }

    applicationPermission: {};
    permissions: UserPermissionCache[];

    currentPermission: UserPermissionCache;

    authorizationPermissionItem: any;

    pagePermission: {
        [key: string]: any;
    };

    set data(value: {
        [key: string]: any;
    }) {
        this.localStorage.save('data', value);
    }

    get data(): {
        [key: string]: any;
    } {
        return this.localStorage.get('data');
    }

    isAuthorize: boolean = false;

    isApplicationAuthorized() {
        return this.isAuthorize;
    }

    authorizationBroadcast(data: any) {
        this.isAuthorize = true;
        this.authorizationSubject.next(data);
    }
}

export class AuthorizeApi {
    constructor(authorize?: AuthorizeApi) {
        if (authorize) {
            this.applicationModuleId = authorize.applicationModuleId;
            this.childModuleName = authorize.childModuleName;
            this.api = authorize.api;
            this.keyName = authorize.keyName;
        }
    }
    childModuleName?: string;
    applicationModuleId?: number;
    api: string;
    keyName?: string;
    mainRecordId?: string;
    keys?: string[];
    cacheKeyName?: string;
}
