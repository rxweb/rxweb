import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule, RxRoutingModule } from '@rxweb/angular-router';
import { AuthResolver } from './domain/security/authentication-resolver';
import { AuthorizationResolver } from './domain/security/authorization-resolver';
import { RxHttp } from '@rxweb/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RxWebModule } from './rxweb.module';
import { RxTranslateModule } from '@rxweb/translate';


const route = RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' });
@routerModule({
  authentication:AuthResolver,
  authorization:AuthorizationResolver
})

@NgModule({
  declarations: [
    AppComponent,TopbarComponent,SidebarComponent
  ],
  imports: [
    route,
    BrowserModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    RxRoutingModule,
    FormsModule,
    RxTranslateModule.forRoot({
      cacheLanguageWiseObject: true,
      globalFilePath: "assets/i18n/{{language-code}}/global.{{language-code}}.json",
      filePath: "assets/i18n/{{language-code}}/{{translation-name}}.{{language-code}}.json"        
  }),
    HttpClientModule
  ],
  providers: [RxHttp],
  exports: [RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }

