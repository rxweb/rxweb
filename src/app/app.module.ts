import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable, Inject, ReflectiveInjector } from "@angular/core"
import { AppComponent } from './app.component';
import { RxFormBuilder, RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RequestHeaders } from "@rx/http";
import { ResponseResult } from "@rx/http";
import { API_HOST_URI, RxHttp, APP_VERSION } from '@rx/http';
import { RxValidation, RxFormsModule } from '@rx/forms';
import { RxViewModule, RxViewServiceModule } from '@rx/view';
import { RxStorageModule } from '@rx/storage';
import { RxSecurityModule, PermissionService } from "@rx/security";
import { RxTableModule } from "@rx/table";
import { ApplicationBroadcaster } from "@rx/core";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { AuthorizeApi } from "@rx/security";
import { RequestOptions, Headers } from "@angular/http";
import { Response } from "@angular/http";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { ComponentCanDeactivate, ApplicationConfiguration} from "@rx/core";
@Injectable()
export class PageAccess implements CanActivate {
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
return true;
}
}
export class ApplicationResponse implements ResponseResult {
    error: (message: string) => void;
    check(response: Response, requestMethod: string, showToast: boolean): boolean {
        return true;
    }
}
export class ApplicationRequestHeaders implements RequestHeaders {
    get(url: string, requestMethod?: string, authorizeApi?: AuthorizeApi, showSpinner?: boolean): RequestOptions {
        return null;
    }
}
export class ChangeDetectionGuard implements CanDeactivate<ComponentCanDeactivate> {
    canDeactivate(
        component: ComponentCanDeactivate,
        route: ActivatedRouteSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule,
      RxTableModule,
      HttpModule, RxSecurityModule, CommonModule,
      RxFormsModule, RxViewModule, RxStorageModule, RxViewServiceModule
  ],
  providers: [RxValidation,

      PermissionService, ApplicationBroadcaster,
      {
          provide: API_HOST_URI,
          useValue: 'http://localhost:4200/'
      }

      ,
      {
          provide: APP_VERSION,
          useValue: 1
      },
      RxHttp,
      { provide: 'RequestHeaders', useClass: ApplicationRequestHeaders },
      { provide: 'ResponseResult', useClass: ApplicationResponse }, RxHttp,
      { provide: 'PageAccess', useClass: PageAccess },
      { provide: 'ChangeDetectionGuard', useClass: ChangeDetectionGuard }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


