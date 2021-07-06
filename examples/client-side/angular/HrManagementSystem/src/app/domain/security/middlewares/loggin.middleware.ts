import { Injectable } from '@angular/core';
import { IMiddleware } from '@rxweb/angular-router'
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorage } from '../../services/browser-storage';

@Injectable({
    providedIn: 'root',
})

// loggin middleware to check whether the auth is present in the local storage, if not then it will navigate to the login page
export class LoggedInMiddleware implements IMiddleware {
    constructor(private router: Router, private storage: BrowserStorage) { }
    invoke(user: { [key: string]: any; }, activateRouteSnapshot: any): boolean | Promise<boolean> {
        var auth = this.storage.local.get('auth',false);
        if (auth)
            this.router.navigate(['login']);
        return true;
    }
}
